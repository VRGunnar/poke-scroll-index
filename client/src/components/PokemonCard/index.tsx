import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type WheelEventHandler,
} from "react";
import { getPokemonSprite } from "./pokemonSpriteUtils";
import { PokemonMetricsPanel } from "./PokemonMetricsPanel";
import { PokemonSprite } from "./PokemonSprite";
import { Button } from "./Button";
import { Loader } from "./Loader";
import { useLazyQuery } from "@apollo/client/react";
import { useFragment, type FragmentType } from "../../gql";
import {
  PokemonByIdDocument,
  PokemonFieldsFragmentDoc,
} from "../../gql/graphql";
import { PokemonBackgroundCanvas } from "./PokemonBackgroundCanvas";
import { PokemonStatsGrid } from "./PokemonStatsGrid";
import { PokemonTypeBadges } from "./PokemonTypeBadges";
import {
  clampPokemonId,
  formatPokemonId,
  formatPokemonName,
  getTypePalette,
  randomPokemonId,
} from "../constants";
import "./pokemonCard.css";

type HistoryState = {
  ids: number[];
  index: number;
};

export function PokemonCard() {
  // Delayed loader state to avoid flashing for fast loads
  const [showLoader, setShowLoader] = useState(false);
  const [pokemonRef, setPokemonRef] = useState<FragmentType<
    typeof PokemonFieldsFragmentDoc
  > | null>(null);
  const pokemon = useFragment(PokemonFieldsFragmentDoc, pokemonRef);

  const [history, setHistory] = useState<HistoryState>({ ids: [], index: -1 });
  const [loading, setLoading] = useState(true);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [isShiny, setIsShiny] = useState(false);

  const [fetchPokemonById] = useLazyQuery(PokemonByIdDocument, {
    fetchPolicy: "cache-first",
  });

  const requestSeqRef = useRef(0);
  const scrollAccumRef = useRef(0);
  const scrollTimeoutRef = useRef<number | null>(null);
  const cryAudioRef = useRef<HTMLAudioElement | null>(null);

  const palette = useMemo(
    () => getTypePalette(pokemon?.types[0]),
    [pokemon?.types],
  );

  const sprite = useMemo(
    () => getPokemonSprite(pokemon, isShiny),
    [isShiny, pokemon],
  );

  const cryUrl = useMemo(
    () => pokemon?.cryLegacy ?? pokemon?.cryLatest ?? null,
    [pokemon?.cryLatest, pokemon?.cryLegacy],
  );

  const isHistoryActive =
    history.ids.length > 0 && history.index < history.ids.length - 1;
  const canGoBack = history.index > 0;
  const canGoForward =
    history.index >= 0 && history.index < history.ids.length - 1;

  const fetchAndRender = useCallback(
    async (
      id: number,
      mode: "push" | "history" = "push",
      historyIndex?: number,
    ) => {
      const clampedId = clampPokemonId(id);
      const sequence = requestSeqRef.current + 1;
      requestSeqRef.current = sequence;

      setLoading(true);
      setErrorText(null);

      try {
        const result = await fetchPokemonById({ variables: { id: clampedId } });

        if (requestSeqRef.current !== sequence) {
          return;
        }

        const nextRef = result.data?.pokemon;
        if (!nextRef) {
          setErrorText("Pokemon not found");
          setLoading(false);
          return;
        }

        setPokemonRef(nextRef);
        if (mode === "history" && historyIndex != null) {
          setHistory((previous) => ({ ...previous, index: historyIndex }));
        } else {
          setHistory((previous) => {
            const ids = [...previous.ids, clampedId];
            return { ids, index: ids.length - 1 };
          });
        }
      } catch (error) {
        if (requestSeqRef.current !== sequence) {
          return;
        }

        const message =
          error instanceof Error ? error.message : "Connection failed";
        setErrorText(
          message.includes("404")
            ? "Pokemon not found"
            : "Connection failed - try again",
        );
      } finally {
        if (requestSeqRef.current === sequence) {
          setLoading(false);
        }
      }
    },
    [fetchPokemonById],
  );

  const navigateHistory = useCallback(
    async (direction: -1 | 1) => {
      const nextIndex = history.index + direction;
      if (nextIndex < 0 || nextIndex >= history.ids.length) {
        return;
      }

      const targetId = history.ids[nextIndex];
      await fetchAndRender(targetId, "history", nextIndex);
    },
    [fetchAndRender, history.ids, history.index],
  );

  const goPrevious = useCallback(async () => {
    if (loading) return;

    if (history.index > 0) {
      await navigateHistory(-1);
    }
  }, [history.index, loading, navigateHistory]);

  const goNext = useCallback(async () => {
    if (loading) return;

    if (history.index < history.ids.length - 1) {
      await navigateHistory(1);
    }
  }, [history.ids.length, history.index, loading, navigateHistory]);

  const goRandom = useCallback(async () => {
    if (loading) return;
    await fetchAndRender(randomPokemonId());
  }, [fetchAndRender, loading]);

  // Show loader with delay to avoid flash
  useEffect(() => {
    let loaderTimeout: number | null = null;
    if (loading) {
      loaderTimeout = window.setTimeout(() => setShowLoader(true), 150);
    }
    return () => {
      if (loaderTimeout != null) window.clearTimeout(loaderTimeout);
      setShowLoader(false);
    };
  }, [loading]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchAndRender(randomPokemonId());
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [fetchAndRender]);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current != null) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
      // Only pause audio, do not set ref to null (React 18+ restriction)
      cryAudioRef.current?.pause();
    };
  }, []);

  const playCry = useCallback(() => {
    if (!cryUrl || loading) {
      return;
    }

    // Always create a new Audio instance to avoid React mutation warnings
    const newAudio = new Audio(cryUrl);
    newAudio.preload = "auto";
    newAudio.currentTime = 0;
    cryAudioRef.current?.pause();
    cryAudioRef.current = newAudio;
    void newAudio.play().catch(() => {
      setErrorText(
        (previous) =>
          previous ?? "Audio playback blocked - click again to retry",
      );
    });
  }, [cryUrl, loading]);

  const onWheel: WheelEventHandler<HTMLElement> = useCallback(
    (event) => {
      event.preventDefault();

      scrollAccumRef.current += event.deltaY;
      if (scrollTimeoutRef.current != null) {
        window.clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = window.setTimeout(() => {
        const delta = scrollAccumRef.current;
        scrollAccumRef.current = 0;

        if (Math.abs(delta) <= 30 || loading) {
          return;
        }

        if (isHistoryActive) {
          if (delta > 0) {
            void goNext();
          } else {
            void goPrevious();
          }
          return;
        }

        void goRandom();
      }, 80);
    },
    [goNext, goPrevious, goRandom, isHistoryActive, loading],
  );

  return (
    <section className="fixed inset-0 w-full h-full min-h-dvh flex items-stretch justify-stretch bg-[#05050b]">
      <article
        className="explorer-root relative w-full h-full min-h-dvh overflow-hidden text-[#e8e8ff] flex flex-col items-center justify-center"
        style={
          {
            ["--explorer-accent" as string]: palette.accent,
            ["--explorer-glow" as string]: palette.glow,
            ["--explorer-ring" as string]: `${palette.accent}66`,
          } as CSSProperties
        }
        onWheel={onWheel}
      >
        <PokemonBackgroundCanvas accentColor={palette.accent} />

        <div className="explorer-hint-bar explorer-orbitron absolute top-0 inset-x-0 hidden sm:block text-[9px] sm:text-[10px] tracking-[0.16em] sm:tracking-[0.2em] text-center py-1.5 text-[#ff6b6b] uppercase z-20 px-2">
          Pokedex - Scroll wheel or buttons to explore
        </div>

        {/* Always render card; overlay loader if loading */}
        {pokemon && (
          <>
            <div className="explorer-mode-pill explorer-orbitron relative z-20 mb-3 px-3 sm:px-4 py-2 w-full max-w-104 flex items-start justify-between gap-3 uppercase">
              <div className="min-w-0 text-left">
                <p className="text-[8px] sm:text-[10px] tracking-[0.2em] text-white/65">
                  {isHistoryActive ? "History active" : "Random active"}
                </p>
                <p className="text-[9px] sm:text-[11px] tracking-[0.15em] mt-1 text-(--explorer-accent)">
                  {isHistoryActive
                    ? "Scroll: previous / next"
                    : "Scroll: random"}
                </p>
              </div>

              <div className="min-w-0 flex flex-col items-end">
                <div className="explorer-dex-id explorer-slide-in text-[10px] sm:text-[11px] mb-1 relative z-10">
                  {formatPokemonId(pokemon.id)}
                </div>
                <PokemonTypeBadges
                  types={pokemon.types}
                  className="justify-end gap-1 sm:gap-1.5 mb-0"
                />
              </div>
            </div>

            <h1 className="explorer-orbitron explorer-name explorer-slide-in text-center text-2xl sm:text-3xl md:text-4xl font-black tracking-[0.12em] sm:tracking-widest px-2">
              {formatPokemonName(pokemon.name)}
            </h1>

            <div className="relative z-10 mt-2 mb-2 w-full max-w-112.5 px-1 flex items-center justify-center gap-2.5 md:flex-col md:gap-3">
              <PokemonSprite
                spriteUrl={sprite.url}
                isGif={sprite.isGif}
                name={pokemon.name}
                onClick={playCry}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    playCry();
                  }
                }}
                cryUrl={cryUrl}
              />
              <PokemonMetricsPanel
                weight={pokemon.weight ?? 0}
                height={pokemon.height ?? 0}
                ability={
                  pokemon.abilities[0]?.replaceAll("-", " ") ?? "unknown"
                }
              />
            </div>

            <div className="flex items-center gap-2 mt-3 mb-1 relative z-10">
              <Button
                active={!isShiny}
                onClick={() => setIsShiny(false)}
                ariaLabel="Show normal sprite"
              >
                NORMAL
              </Button>
              <Button
                active={isShiny}
                onClick={() => setIsShiny(true)}
                ariaLabel="Show shiny sprite"
              >
                SHINY
              </Button>
            </div>

            <PokemonStatsGrid
              stats={pokemon.stats}
              accentColor={palette.accent}
            />

            {/* Loader overlay */}
            {showLoader && (
              <div
                className="absolute inset-0 z-50 flex items-center justify-center bg-[#05050bcc] pointer-events-auto transition-opacity duration-200 opacity-100"
                style={{ animation: loading ? "fadeIn 0.2s" : "fadeOut 0.2s" }}
              >
                <Loader loading={loading} />
              </div>
            )}
          </>
        )}

        {errorText && (
          <p className="explorer-orbitron text-[#ff6b6b] text-xs tracking-[0.15em] text-center mt-3 z-10">
            {`WARNING: ${errorText}`}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-3 sm:mt-5 relative z-10 px-2 pb-1 sm:pb-2">
          <Button
            onClick={() => void goPrevious()}
            ariaLabel="Load previous pokemon"
            disabled={!canGoBack || loading}
            className="px-3.5 sm:px-4 py-2"
          >
            PREV
          </Button>
          <Button
            onClick={() => void goRandom()}
            ariaLabel="Load random pokemon"
            disabled={loading}
            className="px-3.5 sm:px-4 py-2"
          >
            RANDOM
          </Button>
          <Button
            onClick={() => void goNext()}
            ariaLabel="Load next pokemon"
            disabled={!canGoForward || loading}
            className="px-3.5 sm:px-4 py-2"
          >
            NEXT
          </Button>
        </div>

        <div className="explorer-orbitron absolute bottom-3 sm:bottom-4 right-3 sm:right-5 hidden sm:flex text-[9px] sm:text-[10px] text-white/30 tracking-[0.18em] sm:tracking-[0.2em] z-20 items-center gap-1.5">
          <span className="explorer-arrow inline-block">↕</span>
          SCROLL
        </div>
        <div className="explorer-orbitron absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 sm:left-5 sm:translate-x-0 block text-[9px] sm:text-[10px] text-white/35 sm:text-white/25 tracking-[0.18em] sm:tracking-[0.2em] z-20">
          {history.ids.length === 0
            ? "History: -"
            : `History: ${history.index + 1} / ${history.ids.length}`}
        </div>
      </article>
    </section>
  );
}

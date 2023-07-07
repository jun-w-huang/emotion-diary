import { SignInButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import LoadingSpinner from "~/components/LoadingSpinner";
import { Sidebar } from "~/components/Sidebar";
import { EmotionButton } from "~/components/EmotionButton";
import { useReducer } from "react";
import CreateEmotionRHF from "~/components/RHF/CreateEmotionRHF";
import { MemoizedCalendar } from "~/components/Calendar/Calendar";
import {
  EmotionRHFModalContext,
  initialEmotionRHFState,
} from "../context/EmotionRHFModalContext";

import { emotionRHFReducer } from "../context/EmotionRHFModalReducer";
import {
  DetailedDayModalContext,
  initialDetailedDayModalState,
} from "../context/DetailedDayModalContext";
import { detailedDayModalReducer } from "../context/DetailedDayModalReducer";
import DetailedDayModal from "~/components/Calendar/DetailedDayModal";
import Logo from "~/components/Logo";
import EmotionSVG from "~/components/EmotionSVG";

const Home: NextPage = () => {
  const { isSignedIn, user } = useUser();
  const [emotionRHFState, emotionRHFDispatch] = useReducer(
    emotionRHFReducer,
    initialEmotionRHFState
  );
  const [detailedDayModalState, detailedDayModalDispatch] = useReducer(
    detailedDayModalReducer,
    initialDetailedDayModalState
  );

  const { data: events, isLoading } = api.emotionEvent.getMyEvents.useQuery(
    undefined,
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  );

  if (!isSignedIn || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <Logo />

          <div className="flex gap-2">
            <EmotionSVG emotion="Joy" />
            <SignInButton>
              <EmotionButton label="Sign in" />
            </SignInButton>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Emotion Diary</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/emotionSVGs/joy.svg" />
      </Head>

      <main className="flex h-screen flex-col items-center">
        <div className="flex h-screen w-full flex-row">
          <EmotionRHFModalContext.Provider
            value={{ state: emotionRHFState, dispatch: emotionRHFDispatch }}
          >
            {emotionRHFState.isShowingModal && (
              <CreateEmotionRHF
                existingEvent={emotionRHFState.currentEvent}
                date={emotionRHFState.date}
                closeModal={() => emotionRHFDispatch({ type: "close" })}
              />
            )}
            <DetailedDayModalContext.Provider
              value={{
                state: detailedDayModalState,
                dispatch: detailedDayModalDispatch,
              }}
            >
              <Sidebar user={user}>
                {detailedDayModalState.isShowingModal && (
                  <DetailedDayModal
                    dateEvents={detailedDayModalState.dateEvents}
                  />
                )}
              </Sidebar>
              <div className="flex h-full w-full flex-col items-center justify-center px-4 py-12">
                {events && <MemoizedCalendar events={events} />}
              </div>
            </DetailedDayModalContext.Provider>
          </EmotionRHFModalContext.Provider>
        </div>
      </main>
    </>
  );
};

export default Home;

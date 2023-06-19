import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import LoadingSpinner from "~/components/LoadingSpinner";
import { Sidebar } from "~/components/Sidebar";
import { MemoizedCalendar } from "~/components/Calendar/Calendar";

const Home: NextPage = () => {
  const { isSignedIn, user } = useUser();
  const { data: events, isLoading } = api.emotionEvent.getMyEvents.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  if (!isSignedIn || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <h1 className="py-5 text-5xl text-black">Emotion Diary</h1>
          <div className="flex h-12 w-48 items-center justify-center rounded-lg border bg-slate-500 text-white">
            <SignInButton />
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
        <link rel="icon" href="/joy.svg"/>
      </Head>

      <main className="flex h-screen flex-col items-center">
        <div className="flex h-screen w-full flex-row">
          <Sidebar user={user} />
          <div className="py-12 px-4 flex h-full w-full flex-col items-center justify-center">
            {events && <MemoizedCalendar events={events} />}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

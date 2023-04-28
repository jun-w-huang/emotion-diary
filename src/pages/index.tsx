import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { api } from "~/utils/api";
import Calendar from "~/components/Calendar/Calendar";
import LoadingSpinner from "~/components/LoadingSpinner";
import CreateEmotionRHF from "~/components/RHF/CreateEmotionRHF";
import { Sidebar } from "~/components/Sidebar";

const Home: NextPage = () => {
  const { isSignedIn, user } = useUser();
  // Move to getById after finishing functionality
  // const { data, isLoading } = api.emotionEvent.getById.useQuery({id: user});
  const { data, isLoading } = api.emotionEvent.getAll.useQuery();

  const [showingModal, isShowingModal] = useState<boolean>(false);

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
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex h-screen flex-col items-center">
        <div className="flex h-screen w-full flex-row">
          {/* Remove the isSignedIn in the future, once login is set up properly */}
          <Sidebar user={user} isSignedIn={isSignedIn!} isShowingModal={isShowingModal}/>
          <div className="relative my-24 flex flex-1 flex-col items-center justify-center">
            {showingModal && (
              <CreateEmotionRHF closeModal={() => isShowingModal(false)} />
            )}
            {data && <Calendar events={data} />}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

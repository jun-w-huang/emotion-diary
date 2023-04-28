import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { api } from "~/utils/api";
import Calendar from "~/components/Calendar/Calendar";
import LoadingSpinner from "~/components/LoadingSpinner";
import Link from "next/link";
import CreateEmotionRHF from "~/components/RHF/CreateEmotionRHF";
import { Button } from "~/components/Button";

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
        <div className="flex h-screen w-full flex-col">
          <div className="flex justify-between p-5">
            <Button onClick={() => isShowingModal(true)}>+</Button>
            <Button>
              <Link href={`/analyze/${user?.id}`}>View Data analysis</Link>
            </Button>

            <Button>{isSignedIn ? <SignOutButton /> : <SignInButton />}</Button>
          </div>
          <div className="relative flex flex-1 flex-col items-center justify-center pb-8">
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

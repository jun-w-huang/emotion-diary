import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { api } from "~/utils/api";
import CreateEmotionRHF from "~/components/CreateEmotionRHF";
import Calendar from "~/components/Calendar";
import LoadingSpinner from "~/components/LoadingSpinner";

/* TODO: 
3. Physical symptom, can select multiple.
4. refactor Form functions outside component body if they aren't necessary
5. ADD TOAST FOR FORM ERROR SUBMISSION, on TRPC side... not client side...
3. Create ability to click CalendarCells for detailed view.
4. CALENDAR SWAP TO DAILY VIEW / WEEKLY VIEW

*/

const Home: NextPage = () => {
  const { isSignedIn, user } = useUser();
  // Move to getById after finishing functionality
  // const { data, isLoading } = api.emotionEvent.getById.useQuery({id: user});

  const { data, isLoading } = api.emotionEvent.getAll.useQuery();

  const [showingModal, isShowingModal] = useState<boolean>(false);

  // if (isLoading) {
  //   return (
  //     <div className="flex h-screen w-full items-center justify-center">
  //       <LoadingSpinner />
  //     </div>
  //   );
  // }

  return (
    <>
      <Head>
        <title>Emotion Diary</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex h-screen max-h-screen flex-col items-center">
        <div className="flex max-h-full flex-1 flex-col">
          <div className="flex justify-between">
            <button
              className="rounded-lg border bg-slate-500 px-4 text-white"
              onClick={(e) => isShowingModal(true)}
            >
              +
            </button>
            {isSignedIn ? <SignOutButton /> : <SignInButton />}
          </div>
          {showingModal && (
            <CreateEmotionRHF closeModal={() => isShowingModal(false)} />
          )}
          {data && <Calendar events={data} />}
        </div>
      </main>
    </>
  );
};

export default Home;

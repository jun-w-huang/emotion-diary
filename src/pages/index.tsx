import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { Calendar as BigCalendar, dayjsLocalizer } from "react-big-calendar";
import * as dayjs from "dayjs";

import { api } from "~/utils/api";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CreateEmotionRHF from "~/components/CreateEmotionRHF";
import Calendar from "~/components/Calendar";

/* TODO: 
1. Add start and end times to EmotionEvent in Prisma,
2. Make sure that this is reflecting correctly in calender
3. Add other fields to EmotionEvents

*/

const Home: NextPage = () => {
  const user = useUser();

  const { data, isLoading } = api.emotionEvent.getAll.useQuery();

  const [showingModal, isShowingModal] = useState<boolean>(false);

  const localizer = dayjsLocalizer(dayjs);

  if (isLoading) {
    return <div>

    </div>
  }



  return (
    <>
      <Head>
        <title>Emotion Diary</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center">
        <div>
          <button className="border bg-slate-500 text-white px-4 rounded-lg" onClick={(e) => isShowingModal(true)}>+</button>
          {showingModal && (
            <CreateEmotionRHF closeModal={() => isShowingModal(false)} />
          )}
          {/* <BigCalendar
            localizer={localizer}
            onSelectEvent={(event) => {
              console.log(event.title);
            }}
            events={data}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
          /> */}
          {data && <Calendar events={data}/>}
        </div>

        {user.isSignedIn ? <SignOutButton /> : <SignInButton />}

        <div>
          {data?.map((emotionEvent) => (
            <div key={emotionEvent.id}>{emotionEvent.title}</div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;

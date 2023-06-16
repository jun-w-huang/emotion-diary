import { RedirectToSignIn, SignInButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import LoadingSpinner from "~/components/LoadingSpinner";
import { DoughnutChart } from "~/components/Analysis/DoughnutChart";
import { Sidebar } from "~/components/Sidebar";
import { useRouter } from "next/router";
import { ChartWrapper } from "~/components/Analysis/ChartWrapper";
import MatrixChart from "~/components/Analysis/MatrixChart";
import { WordCloudChart } from "~/components/Analysis/WordCloudChart";

const Analysis: NextPage = () => {
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  const { data: allEvents } = api.emotionEvent.getMyEvents.useQuery();

  const { data: commonEmotions, isLoading } =
    api.emotionEvent.getMostCommonEmotions.useQuery();
  const { data: commonPsymptoms } =
    api.emotionEvent.getMostCommonPSymptoms.useQuery();

  const { data: areReflective } = api.emotionEvent.getAreReflective.useQuery();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user || user.id !== router.query.id) {
    return (
      <div className="flex h-screen w-full items-center justify-center text-center">
        404 Not Authorized
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Analysis</title>
      </Head>

      <main className="flex h-screen flex-col items-center">
        <div className="flex h-screen w-full flex-row">
          <Sidebar user={user} isHome={false} />
          <div className="flex flex-1 items-center justify-center overflow-y-scroll">
            <div className="flex h-5/6 w-5/6 flex-wrap items-center justify-center">
              {commonEmotions && (
                <ChartWrapper
                  title="Your most common emotions"
                  child={
                    <DoughnutChart
                      labels={commonEmotions.map((entry) => entry.emotion)}
                      values={commonEmotions.map((entry) => entry.count)}
                    />
                  }
                />
              )}

              {commonEmotions && (
                <ChartWrapper
                  title="Emotion Word Cloud"
                  child={
                    <WordCloudChart
                      words={commonEmotions.map(({ emotion, count }) => ({
                        text: emotion,
                        value: count * 10,
                      }))}
                    />
                  }
                />
              )}
              {commonPsymptoms && (
                <ChartWrapper
                  title="Your most common physical symptoms"
                  child={
                    <DoughnutChart
                      labels={commonPsymptoms.map((entry) => entry.psymptom)}
                      values={commonPsymptoms.map((entry) => entry.count)}
                    />
                  }
                />
              )}
              {areReflective && (
                <ChartWrapper
                  title="Are your emotions reflective of your self conception?"
                  child={
                    <DoughnutChart
                      labels={["Are reflective", "Are not reflective"]}
                      values={[
                        areReflective.areReflective,
                        areReflective.areNotReflective,
                      ]}
                    />
                  }
                />
              )}
              {allEvents && (
                // <ChartWrapper
                //   title="Are your emotions reflective of your self conception?"
                //   child={
                //     <MatrixChart
                //       events={allEvents}
                //     />
                //   }
                // />
                <MatrixChart emotionEvents={allEvents} width={1000} height={500} />
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Analysis;

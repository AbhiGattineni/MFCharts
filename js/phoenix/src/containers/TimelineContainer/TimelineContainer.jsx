import { useEffect, useState } from "react";
import { Timeline } from "../../components/Timeline/Timeline";
import { Button, Input } from "../../components";
import { auth } from "../../config/firebase";

export const TimelineContainer = ({ id }) => {
  const [timelineData, setTimelineData] = useState("");
  const [timelineUrl, setTimelineUrl] = useState("");
  const [timlelineDisplay, setTimlelineDisplay] = useState([]);

  const addTimeline = () => {
    if (timelineData.length > 0) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const current = new Date();
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          schemeCode: id,
          userId: auth.currentUser.uid,
          date: `${current.getFullYear()}-${
            current.getMonth() + 1
          }-${current.getDate()}`,
          description: timelineData,
          url: timelineUrl,
        }),
      };
      fetch("http://127.0.0.1:5000/api/portfolio/addtimeline", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => console.error(error));
      setTimelineData("");
      setTimelineUrl("");
    }
  };
  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/timeline/${auth.currentUser.uid}/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        setTimlelineDisplay(data);
      });
  }, []);

  return (
    <div className="">
      <Timeline Timelinedata={timlelineDisplay} />
      <div className="px-5 mb-3">
        <Input
          placeholder="Add timeline ..."
          classes="w-full"
          value={timelineData}
          onChange={(e) => setTimelineData(e.target.value)}
        />
        <Input
          placeholder="Reference link ..."
          classes="w-full"
          value={timelineUrl}
          onChange={(e) => setTimelineUrl(e.target.value)}
        />
        <div className="flex flex-col items-center">
          <Button
            text="Add timeline"
            classes={[
              `w-1/2 ${
                timelineData.length === 0 ? "cursor-not-allowed opacity-50" : ""
              }`,
            ]}
            handleClick={addTimeline}
            disabled={timelineData.length === 0}
          />
        </div>
      </div>
    </div>
  );
};

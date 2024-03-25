import type { QuestionModel } from "models/view/question";
import * as React from "react";
import AccordionComponent from "./Accordion";

interface ControlledAccordionsProps {
  data: QuestionModel[];
  fetchData: () => Promise<void>;
}

export default function ControlledAccordions({
  data = [],
  fetchData,
}: ControlledAccordionsProps) {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div>
      {data.map((item, index) => (
        <AccordionComponent
          key={index}
          fetchData={fetchData}
          expanded={expanded === "panel" + index}
          onChange={handleChange("panel" + index)}
          data={item}
        />
      ))}
    </div>
  );
}

import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckIcon from "@mui/icons-material/Check";

interface ControlledAccordionsItemModel {
  title: string;
  content: string;
}

interface ControlledAccordionsProps {
  data: ControlledAccordionsItemModel[];
}

export default function ControlledAccordions({
  data = [],
}: ControlledAccordionsProps) {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div>
      {data.map((item, index) => (
        <Accordion
          expanded={expanded === "panel" + index}
          onChange={handleChange("panel" + index)}
          slotProps={{ transition: { unmountOnExit: true } }}
          sx={{ width: '100%' }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ flexShrink: 0, marginRight: 5 }}>
              {item.title}
            </Typography>
            {item.content && <CheckIcon color="success" />}
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{item.content}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

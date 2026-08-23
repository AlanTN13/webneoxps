import React, { useState } from "react";
import ProblemStage from "./operation-story/ProblemStage";
import {
  CoolingLeadScene,
  RepetitiveWorkScene,
  VisibilityScene,
} from "./operation-story/ProblemScenes";

const CHAPTERS = [
  {
    number: "01",
    label: "Oportunidades",
    title: "Te están escribiendo. Estás llegando tarde.",
    labelSecondary: "Captación + seguimiento",
    scene: CoolingLeadScene,
  },
  {
    number: "02",
    label: "Control",
    title: "Tu equipo está trabajando. Vos necesitás saber qué está pasando.",
    labelSecondary: "CRM",
    scene: VisibilityScene,
  },
  {
    number: "03",
    label: "Tiempo",
    title: "Tu gente no debería responder lo mismo todo el día.",
    labelSecondary: "Agentes IA",
    scene: RepetitiveWorkScene,
  },
];

export default function OperationStory() {
  const [activeChapter, setActiveChapter] = useState(0);
  const chapter = CHAPTERS[activeChapter];

  return (
    <div id="operation-story" className="bg-[#fdfdfc]">
      <ProblemStage
        chapter={chapter}
        activeChapter={activeChapter}
        onSelect={setActiveChapter}
      >
        {React.createElement(chapter.scene)}
      </ProblemStage>
    </div>
  );
}

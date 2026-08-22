import React, { useState } from "react";
import OperationStage from "./operation-story/OperationStage";
import {
  AutomationScene,
  EntryScene,
  FrictionScene,
  OrderScene,
  ResultScene,
} from "./operation-story/StageScenes";

const STAGES = [
  {
    number: "01",
    label: "Entrada",
    title: "Todo empieza con una oportunidad.",
    scene: EntryScene,
  },
  {
    number: "02",
    label: "Fricción",
    title: "Cuando crece el volumen, también aparece fricción.",
    scene: FrictionScene,
  },
  {
    number: "03",
    label: "Orden",
    title: "Ahora cada oportunidad sabe qué sigue.",
    scene: OrderScene,
  },
  {
    number: "04",
    label: "Automatización",
    title: "Lo repetitivo se resuelve. La excepción llega a una persona.",
    scene: AutomationScene,
  },
  {
    number: "05",
    label: "Resultado",
    title: "Atendida. Trazable. Con próximo paso.",
    scene: ResultScene,
  },
];

export default function OperationStory() {
  const [activeStage, setActiveStage] = useState(0);
  const stage = STAGES[activeStage];

  return (
    <div id="operation-story" className="bg-[#fdfdfc]">
      <OperationStage stage={stage} activeStage={activeStage} onSelect={setActiveStage}>
        {React.createElement(stage.scene)}
      </OperationStage>
    </div>
  );
}

import React from "react";
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
  return (
    <div id="operation-story" className="bg-[#fdfdfc]">
      {STAGES.map(({ number, label, title, scene }, index) => (
        <OperationStage
          key={number}
          number={number}
          label={label}
          title={title}
          footer={
            index === STAGES.length - 1 ? (
              <div className="text-center text-[clamp(2rem,4.2vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.06em] text-[#0c1730]">
                Más ventas. Más control. Menos trabajo manual.
              </div>
            ) : null
          }
        >
          {React.createElement(scene)}
        </OperationStage>
      ))}
    </div>
  );
}

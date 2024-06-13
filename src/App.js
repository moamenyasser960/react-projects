/* eslint-disable */

import { useState } from "react";

const data = [
  {
    id: 0,
    title: "Echoes of the Past",
    description:
      "A journey through forgotten memories and ancient secrets. This tale spans across centuries, unveiling the hidden truths of civilizations long gone. As you delve deeper, you will uncover stories of lost empires, forgotten heroes, and the enigmatic artifacts they left behind. Each chapter is a gateway to a time when magic and reality intertwined, painting a vivid picture of a world that once was.",
  },
  {
    id: 1,
    title: "Whispers in the Wind",
    description:
      "Mystical tales carried by the breeze from faraway lands. These stories are fragments of a grand narrative, each whisper telling of lands where the natural and supernatural coexist. From the deserts of the east to the icy peaks of the north, these tales are the voice of nature itself, recounting the exploits of spirits, gods, and creatures that dwell in the realms unseen by mortal eyes.",
  },
  {
    id: 2,
    title: "Shadows of the Future",
    description:
      "Exploring the unknown realms of what is yet to come. This collection delves into the possible futures that await humanity, shaped by our choices today. It presents a mosaic of scenarios, from dystopian wastelands to utopian societies, each a reflection of our hopes and fears. Through these stories, we examine the consequences of technological advancements, environmental changes, and the ever-evolving human spirit.",
  },
  {
    id: 3,
    title: "Secrets of the Ocean",
    description:
      "Diving deep into the mysteries hidden beneath the waves. The ocean is a vast, unexplored frontier, teeming with life and secrets. This narrative takes you on an underwater odyssey, uncovering the wonders of marine ecosystems, the lore of ancient seafaring cultures, and the cryptic messages encoded in the ocean's depths. From bioluminescent creatures to sunken cities, every page reveals a new marvel.",
  },
  {
    id: 4,
    title: "Journey to the Stars",
    description:
      "An expedition through the vastness of the cosmos. Embark on an interstellar voyage that stretches the boundaries of human imagination. This series of stories explores the frontiers of space exploration, the mysteries of black holes, and the potential for extraterrestrial life. It is a testament to human curiosity and our relentless pursuit of knowledge, chronicling the adventures and discoveries that lie beyond our planet.",
  },
  {
    id: 5,
    title: "Tales of the Forgotten",
    description:
      "Stories of people and places lost in the annals of time. These narratives bring to life the forgotten chapters of history, illuminating the lives of those who have been overshadowed by the grand events of their era. From unsung heroes to vanished civilizations, each tale is a tribute to the resilience and spirit of those who lived in times of great change and upheaval.",
  },
  {
    id: 6,
    title: "Enigma of the Sphinx",
    description:
      "Unraveling the riddles of ancient civilizations. The Sphinx, with its timeless gaze, is a symbol of the mysteries that have captivated humanity for millennia. This collection explores the riddles posed by ancient monuments, the wisdom encoded in their construction, and the legends that have grown around them. It is a journey into the heart of human ingenuity and the quest for understanding our past.",
  },
  {
    id: 7,
    title: "Realm of Dreams",
    description:
      "Exploring the fantastical landscapes of the subconscious. Dreams are a portal to a world where the impossible becomes possible. This anthology dives into the dreamscapes that exist within our minds, bringing forth stories of surreal adventures, abstract concepts, and the profound connections between dreams and reality. It is a celebration of the creativity and wonder that lies within us all.",
  },
  {
    id: 8,
    title: "Legends of the Forest",
    description:
      "Myths and folklore from the heart of the wilderness. The forest has always been a source of inspiration and fear, a place where myths are born. This collection gathers tales from diverse cultures, each revealing the deep connection between humans and the natural world. From enchanted groves to haunted woods, these stories highlight the magic and mystery that thrive in the heart of the forest.",
  },
  {
    id: 9,
    title: "Chronicles of the Brave",
    description:
      "Epic tales of heroes and their daring adventures. Bravery takes many forms, and this anthology showcases the myriad ways in which courage manifests. From legendary warriors to everyday heroes, these stories celebrate the triumphs of those who face their fears and overcome insurmountable odds. Each tale is a testament to the strength and resilience of the human spirit, inspiring readers to find their own courage within.",
  },
];

function App() {
  const [show, setShow] = useState(data[0].id);
  return (
    <div className="flex bg-gray-600 justify-center items-center h-screen shadow-sm">
      <div className="flex overflow-auto h-3/4 w-9/12 border-gray-300 border-2 shadow-md shadow-slate-800 rounded-lg">
        <aside className="max-w-max w-1/4 p-2 sticky gray top-0 bg-gray-100 shadow-md shadow-slate-800">
          {data.map((s) => (
            <div
              data-id={s.id}
              key={s.id}
              onClick={(s) => setShow(s.target.attributes["data-id"].value)}
              className="hover:bg-gray-200 cursor-pointer transition-all duration-75 active:bg-gray-300 rounded-md py-1 px-4"
            >
              {s.title}
            </div>
          ))}
        </aside>
        <main className="bg-white flex-1 p-4">{data[show].description}.</main>
      </div>
    </div>
  );
}

export default App;

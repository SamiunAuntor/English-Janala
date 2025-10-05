const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(response => response.json())
        .then(jsonData => displayLessons(jsonData.data))
        .catch(error => console.error("Error loading lessons:", error));
};

const loadWords = (level) => {
    manageLoader(true);
    url = `https://openapi.programming-hero.com/api/level/${level}`;

    fetch(url)
        .then(response => response.json())
        .then(jsonData => {
            removeClickedClass();
            const btnClicked = document.getElementById(`lesson-btn-${level}`);
            btnClicked.classList.add("clicked");
            displayWords(jsonData.data)
        })
        .catch(error => console.error("Error loading words:", error));
}

const displayLessons = lessons => {
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = '';

    for (const lesson of lessons) {
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
      <button id="lesson-btn-${lesson.level_no}" onclick="loadWords(${lesson.level_no})" class="btn lesson-btn btn-outline btn-primary m-2">
        <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
      </button>
    `;
        levelContainer.appendChild(btnDiv);
    }
};

const displayWords = words => {
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = '';


    if (words.length === 0) {
        const noDataDiv = document.createElement('div');
        noDataDiv.className = 'flex flex-col justify-center items-center h-full space-y-3';
        noDataDiv.innerHTML = `
            <img src="./assets/alert-error.png" alt="" class="h-24 w-24">
            <p class="text-[14px] text-center font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="text-2xl font-semibold text-center font-bangla">নেক্সট Lesson এ যান</h2>
        `;
        wordContainer.appendChild(noDataDiv);
    }
    else {
        const gridContainer = document.createElement('div');
        gridContainer.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full';

        for (const word of words) {
            const wordDiv = document.createElement('div');
            wordDiv.innerHTML = `
                <div class="bg-white rounded-2xl py-[20px] px-[15px] text-center space-y-4 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col justify-between">
                    <div>
                        <h2 class="text-[32px] font-bold">${word.word ?? "শব্দ পাওয়া যায়নি।"}</h2>
                        <p class="text-[20px]">Meaning | Pronunciation</p>
                        <h2 class="text-[32px] font-semibold font-bangla text-[#18181B]">${word.meaning ?? "অর্থ পাওয়া যায়নি"} | ${word.pronunciation ?? "উচ্চারণ পাওয়া যায়নি"}</h2>
                    </div>
                    <div class="flex justify-between ml-5 mr-5">
                        <button onclick="loadWordDetails(${word.id})" class="btn border-0 bg-[#1A91FF10] hover:bg-[#1A91FF20]"><i class="fa-solid fa-circle-info"></i></button>
                        <button class="btn border-0 bg-[#1A91FF10] hover:bg-[#1A91FF20]"><i class="fa-solid fa-volume-high"></i></button>
                    </div>
                </div>
            `;
            gridContainer.appendChild(wordDiv);
        }
        wordContainer.appendChild(gridContainer);
    }
    manageLoader(false);
}

const removeClickedClass = () => {
    const buttons = document.getElementsByClassName("lesson-btn");
    for (const btn of buttons) {
        btn.classList.remove("clicked");
    }
};

const loadWordDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;

    fetch(url)
        .then(response => response.json())
        .then(jsonData => displayWordDetails(jsonData.data))
        .catch(error => console.error("Error loading word details:", error));
}

const displayWordDetails = (word) => {
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = `
    <div id="details-container" class="space-y-6 p-4">
  <div>
  <h2 class="font-semibold text-3xl md:text-4xl text-black">
    ${word.word ?? "শব্দ পাওয়া যায়নি।"}
    <span class="text-3xl md:text-4xl text-black">
      (<i class="fa-solid fa-microphone-lines"></i>: ${word.pronunciation})
    </span>
  </h2>
</div>


  <div>
    <p class="font-semibold text-xl md:text-2xl">Meaning</p>
    <p class="font-bangla text-base md:text-lg">${word.meaning ?? "অর্থ পাওয়া যায়নি"}</p>
  </div>

  <div>
    <h2 class="font-semibold text-xl md:text-2xl">Example</h2>
    <p class="text-lg md:text-2xl text-gray-700">${word.sentence}</p>
  </div>

  <div>
    <h2 class="font-bangla text-xl md:text-2xl font-semibold mb-3">সমার্থক শব্দ গুলো</h2>
    <div id="synonyms-card" class="flex flex-wrap gap-3">
      ${displaySynonyms(word.synonyms)}
    </div>
  </div>
</div>
    `;
    document.getElementById('my_modal_2').showModal();
}

const displaySynonyms = (synonyms) => {
    if (synonyms.length === 0) {
        return `<span class="btn btn-sm md:btn-md bg-blue-100 text-blue-700 border-0 hover:bg-blue-200">কোনো সমার্থক শব্দ পাওয়া যায়নি</span>`;
    } else {
        return synonyms.map(synonym => `
            <span class="btn btn-sm md:btn-md bg-blue-100 text-blue-700 border-0 hover:bg-blue-200">
                ${synonym}
            </span>
        `).join('');
    }
};

const manageLoader = (isLoading) => {
    if (isLoading) {
        document.getElementById('loader').classList.remove('hidden');
        document.getElementById('word-container').classList.add('hidden');
    }
    else {
        document.getElementById('loader').classList.add('hidden');
        document.getElementById('word-container').classList.remove('hidden');
    }
}



loadLessons();
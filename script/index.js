const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(response => response.json())
        .then(jsonData => displayLessons(jsonData.data))
        .catch(error => console.error("Error loading lessons:", error));
};

const loadWords = (level) => {
    url = `https://openapi.programming-hero.com/api/level/${level}`;

    fetch(url)
        .then(response => response.json())
        .then(jsonData => displayWords(jsonData.data))
        .catch(error => console.error("Error loading words:", error));
}

const displayLessons = lessons => {
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = '';

    for (const lesson of lessons) {
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
      <button onclick="loadWords(${lesson.level_no})" class="btn btn-outline btn-primary m-2">
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
        // Create a grid container for the word cards
        const gridContainer = document.createElement('div');
        gridContainer.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full';
        
        for (const word of words) {
            const wordDiv = document.createElement('div');
            wordDiv.innerHTML = `
                <div class="bg-white rounded-2xl py-[20px] px-[15px] text-center space-y-4 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col justify-between">
                    <div>
                        <h2 class="text-[32px] font-bold">${word.word}</h2>
                        <p class="text-[20px]">Meaning / Pronunciation</p>
                        <h2 class="text-[32px] font-semibold font-bangla text-[#18181B]">${word.meaning} / ${word.pronunciation}</h2>
                    </div>
                    <div class="flex justify-between ml-7 mr-7">
                        <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF20]"><i class="fa-solid fa-circle-info"></i></button>
                        <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF20]"><i class="fa-solid fa-volume-high"></i></button>
                    </div>
                </div>
            `;
            gridContainer.appendChild(wordDiv);
        }
        wordContainer.appendChild(gridContainer);
    }
}

// load data when page is ready
loadLessons();
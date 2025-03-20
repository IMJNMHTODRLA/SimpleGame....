let color = "black";
let score = -1;

const mapSize = 20;
let map = [];
const label = document.getElementById("typeS")
const scoreLabel = document.getElementById("scoreLabel")

// 랜덤한 맵 생성 함수
function StartRandom() {
    map = []; // 기존 맵을 초기화
    let countOfThree = 0;  // 3이 들어간 횟수를 추적

    for (let i = 0; i < mapSize; i++) {
        let randomTile;
        
        // 최대 5번만 3을 추가하도록 제한
        if (countOfThree < 5 && Math.random() < 0.25) {
            randomTile = 3;
            countOfThree++;
        }
        else if (countOfThree < 5 && Math.random() < 0.25) {
            randomTile = 4;
            countOfThree++;
        } else {
            // 3이 아닌 다른 숫자(1 또는 2)
            randomTile = Math.floor(Math.random() * 2) + 1;
        }
        
        map.push(randomTile);
    }

    score += 1

    color = Math.random() < 0.5 ? "black" : "white";
    label.innerHTML = color
    scoreLabel.innerHTML = score

    updateMap(); // 맵을 새로 생성한 후 화면 업데이트
}

// 타일 이미지 좌표
const tileImagesNumber = {
    1: "0px 0px",   // 땅
    2: "-16px 0px",  // 물
    3: "-32px 0px", // 물
    4: "-48px 0px"  // 물
};

// 기본값을 설정하는 함수
function getTileImage(tile) {
    if (tileImagesNumber[tile] === undefined) {
        return "-240px -240px";  // 에러 이미지 위치
    }
    return tileImagesNumber[tile];
}

// 모든 타일이 같은지 확인하는 함수
function allSession() {
    const tiles = document.querySelectorAll(".mapTerrain");

// 제외할 타일의 배경 위치 (예: "256px 256px"인 타일을 제외)
const excludePositions = ["-240px -240px", "-32px 0px", "-64px 0px"]; // 여러 배경 위치를 추가할 수 있음

// tiles 배열에서 제외할 타일을 제외하고 확인
return Array.from(tiles).filter(tile => !excludePositions.includes(tile.style.backgroundPosition))
    .every(tile => {
        // color에 따라 동일한지 확인
        if (color == "black") {
            return tile.style.backgroundPosition === "-16px 0px";  // black일 때
        } else {
            return tile.style.backgroundPosition === "0px 0px";  // 다른 색일 때
        }
    });
}

// 맵을 업데이트하는 함수
function updateMap() {
    const mapterrain = document.getElementById("mapTerrain");
    mapterrain.innerHTML = ""; // 기존 타일 삭제

    map.forEach(type => {
        const mapTerrainTiles = document.createElement("div");

        mapTerrainTiles.classList.add("mapTerrain");
        mapTerrainTiles.style.backgroundImage = "url('img/MapTerrain.png')";
        mapTerrainTiles.style.backgroundPosition = getTileImage(type);

        mapTerrainTiles.addEventListener("contextmenu", function(event) {
            event.preventDefault(); // 기본 우클릭 메뉴 방지
            const currentPosition = this.style.backgroundPosition;

            if (currentPosition === "-48px 0px") {
                if (event.button == 2) {
                    this.style.backgroundPosition = "-64px 0px"; 
                }
            }

            if (allSession()) {
                StartRandom();
            }
        })

        // 클릭 이벤트 추가
        mapTerrainTiles.addEventListener("click", function(event) {
            const currentPosition = this.style.backgroundPosition;

            // 타일 변경
            if (currentPosition === "0px 0px") {
                this.style.backgroundPosition = "-16px 0px";  
            } else if (currentPosition === "-16px 0px") {
                this.style.backgroundPosition = "0px 0px";  
            } else if (currentPosition === "-48px 0px") {
                score = -1;
                StartRandom();
                return
            } else if (currentPosition === "-32px 0px") {
                score = -1;
                StartRandom();
                return
            }

            // 모든 타일이 같은지 확인 후 랜덤 타일 생성
            if (allSession()) {
                StartRandom();
            }
        });

        mapterrain.appendChild(mapTerrainTiles);
    });
}


// 처음 실행
StartRandom();

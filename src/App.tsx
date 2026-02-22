import React, { useState, useRef, useEffect } from 'react';
import './App.css';

// ✅ import CSS ของ components
import './components/Card.css';
import './components/CardGrid.css';
import './components/Footer.css';
import './components/Header.css';
import './components/StatusBar.css';
import './components/TryAgain.css';

// ✅ import CSS ของ modals
import './modals/AnnouncementModal.css';
import './modals/GuardModal.css';
import './modals/LeaderboardModal.css'
import './modals/RewardModal.css';

import CardGrid from './components/CardGrid';
import Footer from './components/Footer';
import Header from './components/Header';
import StatusBar from './components/StatusBar';
import TryAgain from './components/TryAgain';

import AnnouncementModal from './modals/AnnouncementModal';
import GuardModal from './modals/GuardModal';
import LeaderboardModal from './modals/LeaderboardModal';
import RewardModal from './modals/RewardModal';
import CountdownOverlay from "./components/CountdownOverlay";

import mangoIcon from './assets/moon-icon.png';
import logo from './assets/TogetherWeMoon-logo.png';
import bgMusic from './assets/StarlightSwing.mp3';

import picCard1 from './assets/1.png';
import picCard2 from './assets/2.png';
import picCard3 from './assets/3.png';
import picCard4 from './assets/4.png';
import picCard5 from './assets/5.png';
import picCard6 from './assets/6.png';
import picCard7 from './assets/7.png';
import picCard8 from './assets/8.png';
import picCard9 from './assets/9.png';
import picCard10 from './assets/10.png';
import picCard11 from './assets/11.png';
import picCard12 from './assets/12.png';
import picCard13 from './assets/13.png';
import picCard14 from './assets/14.png';
import picCard15 from './assets/15.png';
import picCard16 from './assets/16.png';
import picCard17 from './assets/17.png';
import picCard18 from './assets/18.png';
import picCard19 from './assets/19.png';
import picCard20 from './assets/20.png';

import { getRandomCards } from './utils/cards';
import { playHoverSound, playClickSound } from './utils/audio';
import { saveScore, loadLeaderboard } from "./api/leaderboardApi";

function App() {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [cards, setCards] = useState(getRandomCards([
    picCard1, picCard2, picCard3, picCard4, picCard5, picCard6,
    picCard7, picCard8, picCard9, picCard10, picCard11, picCard12,
    picCard13, picCard14, picCard15, picCard16, picCard17,
    picCard18, picCard19, picCard20
  ]));

  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [isChecking, setIsChecking] = useState(false);

  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [showGuardModal, setShowGuardModal] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showTryAgain, setShowTryAgain] = useState(false);

  const [playerName, setPlayerName] = useState("");

  // ✅ Timer states
  const [countdown, setCountdown] = useState<number | null>(null);
  const [gameTime, setGameTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ✅ Leaderboard state
  const [leaderboardData, setLeaderboardData] = useState<
    { name: string; time: number; date?: string }[]
  >([]);

  useEffect(() => {
    loadLeaderboard().then(setLeaderboardData);
  }, []);

  // ✅ handle flip
  function handleFlip(index: number) {
    if (isChecking && timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      setFlipped([]);
      setIsChecking(false);
    }

    if (flipped.includes(index)) {
      setFlipped(flipped.filter(i => i !== index));
      return;
    }

    if (flipped.length === 0) {
      setFlipped([index]);
    } else if (flipped.length === 1) {
      const firstIndex = flipped[0];
      const secondIndex = index;
      const newFlipped = [...flipped, index];
      setFlipped(newFlipped);

      setIsChecking(true);

      if (cards[firstIndex] === cards[secondIndex]) {
        const newMatched = [...matched, firstIndex, secondIndex];
        setMatched(newMatched);

        if (newMatched.length === cards.length) {
          stopGame();
          // ✅ บันทึกคะแนนไป API
          saveScore(playerName || "Unknown", gameTime).then(() => {
            loadLeaderboard().then(setLeaderboardData);
          });
          setShowRewardModal(true);
        }

        setIsChecking(false);
        setFlipped([]);
      } else {
        timeoutRef.current = setTimeout(() => {
          setFlipped([]);
          setIsChecking(false);
          timeoutRef.current = null;
        }, 2000);
      }
    }
  }

  // ✅ reset game
  function resetGame() {
    setCards(getRandomCards([
      picCard1, picCard2, picCard3, picCard4, picCard5, picCard6,
      picCard7, picCard8, picCard9, picCard10, picCard11, picCard12,
      picCard13, picCard14, picCard15, picCard16, picCard17,
      picCard18, picCard19, picCard20
    ]));
    setFlipped([]);
    setMatched([]);
    setShowTryAgain(false);
    stopGame();
    setGameTime(0);
  }

  // ✅ start game with countdown
  function startGame() {
    let count = 3;
    setCountdown(count);

    const countdownInterval = setInterval(() => {
      count -= 1;
      setCountdown(count);

      if (count === 0) {
        clearInterval(countdownInterval);

        setCountdown(0);
        setTimeout(() => {
          setCountdown(null);

          const startTime = Date.now();
          timerRef.current = setInterval(() => {
            const diff = Date.now() - startTime;
            setGameTime(diff);
          }, 100);
        }, 1000);
      }
    }, 1000);
  }

  // ✅ stop game
  function stopGame() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  // ✅ resume game
  function resumeGame() {
    const startTime = Date.now() - gameTime;
    timerRef.current = setInterval(() => {
      const diff = Date.now() - startTime;
      setGameTime(diff);
    }, 100);
  }

  return (
    <div className="viewport">
      <CountdownOverlay countdown={countdown} />
      <Header
        logo={logo}
        playerName={playerName}
        setShowAnnouncement={setShowAnnouncement}
        playHoverSound={playHoverSound}
        setShowLeaderboard={setShowLeaderboard}
      />

      <StatusBar
        picksTotal={10}
        picksAvailable={10 - matched.length / 2}
        isMuted={isMuted}
        toggleMute={() => {
          if (audioRef.current) {
            audioRef.current.muted = !audioRef.current.muted;
            setIsMuted(audioRef.current.muted);
          }
        }}
        playHoverSound={playHoverSound}
        audioRef={audioRef}
        bgMusic={bgMusic}
        countdown={countdown}
        gameTime={gameTime}
      />

      <CardGrid
        cards={cards}
        flipped={flipped}
        matched={matched}
        handleFlip={handleFlip}
        mangoIcon={mangoIcon}
      />

      {showAnnouncement && (
        <AnnouncementModal
          setShowAnnouncement={setShowAnnouncement}
          setPlayerName={setPlayerName}
          audioRef={audioRef}
          setIsMuted={setIsMuted}
          playClickSound={playClickSound}
          playHoverSound={playHoverSound}
          startGame={startGame}
        />
      )}

            {showGuardModal && (
        <GuardModal setShowGuardModal={setShowGuardModal} />
      )}

      {showRewardModal && (
        <RewardModal
          setShowRewardModal={setShowRewardModal}
          setShowMascotModal={setShowLeaderboard}
          audioRef={audioRef}
          playerName={playerName}
          gameTime={gameTime}
        />
      )}

      {showLeaderboard && (
        <LeaderboardModal
          setShowLeaderboard={setShowLeaderboard}
          setShowTryAgain={setShowTryAgain}
          leaderboardData={leaderboardData}   // ✅ ใช้ข้อมูลจริงจาก API
          audioRef={audioRef}
          playHoverSound={playHoverSound}
          stopGame={stopGame}
          resumeGame={resumeGame}
        />
      )}

      {showTryAgain && (
        <TryAgain
          resetGame={resetGame}
          startGame={startGame}
        />
      )}
    </div>
  );
}

export default App;

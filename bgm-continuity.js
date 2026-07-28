// 페이지를 이동해도 배경음악이 처음부터 다시 재생되지 않고,
// 이전 페이지에서 듣던 지점부터 이어지도록 재생 위치를 저장/복원한다.
function wireBGMContinuity(audio, storageKey) {
  if (!audio) return;
  const key = storageKey || 'icc_bgm_time';
  const saved = parseFloat(localStorage.getItem(key) || '0');

  function restore() {
    if (saved > 0 && isFinite(saved) && (!audio.duration || saved < audio.duration - 0.5)) {
      try { audio.currentTime = saved; } catch (e) {}
    }
  }
  if (audio.readyState >= 1) restore();
  else audio.addEventListener('loadedmetadata', restore, { once: true });

  setInterval(() => {
    if (!audio.paused) {
      try { localStorage.setItem(key, audio.currentTime); } catch (e) {}
    }
  }, 1000);
  window.addEventListener('pagehide', () => {
    try { localStorage.setItem(key, audio.currentTime); } catch (e) {}
  });
}

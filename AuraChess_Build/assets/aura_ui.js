document.addEventListener('DOMContentLoaded', function() {
    const els = {
        showOverlay: document.getElementById('show-overlay'),
        autoPlay: document.getElementById('auto-play'),
        modeSelect: document.getElementById('mode-select'),
        humanLevel: document.getElementById('human-level'),
        humanLevelVal: document.getElementById('human-level-val'),
        humanLevelGroup: document.getElementById('human-level-group'),
        styleSelect: document.getElementById('style-select'),
        styleGroup: document.getElementById('style-group'),
        autoQueue: document.getElementById('auto-queue'),
        resetBtn: document.getElementById('reset-config'),
        statusDot: document.getElementById('status-dot'),
        statusText: document.getElementById('status-text')
    };

    // Load saved settings
    chrome.storage.local.get([
        'show_function', 'function_atpl', 'mode_function',
        'value_humn', 'value_styk', 'value_nEw_ar'
    ], function(data) {
        // Overlay (shhd = hide, reset/undefined = show)
        els.showOverlay.checked = (data.show_function !== 'shhd');

        // Auto Play
        els.autoPlay.checked = !!data.function_atpl;

        // Mode
        if(data.mode_function) els.modeSelect.value = data.mode_function;
        updateVisibility();

        // Human Level
        if(data.value_humn) {
            els.humanLevel.value = data.value_humn;
            els.humanLevelVal.textContent = data.value_humn;
        }

        // Style
        if(data.value_styk) els.styleSelect.value = data.value_styk;

        // Auto Queue
        els.autoQueue.checked = !!data.value_nEw_ar;

        // Indicate ready
        els.statusDot.classList.add('status-active');
        els.statusText.textContent = "Active";
    });

    // Event Listeners
    els.showOverlay.addEventListener('change', () => {
        const val = els.showOverlay.checked ? 'reset' : 'shhd';
        chrome.storage.local.set({'show_function': val});
    });

    els.autoPlay.addEventListener('change', () => {
        chrome.storage.local.set({'function_atpl': els.autoPlay.checked});
    });

    els.modeSelect.addEventListener('change', () => {
        chrome.storage.local.set({'mode_function': els.modeSelect.value});
        updateVisibility();
    });

    els.humanLevel.addEventListener('input', () => {
        els.humanLevelVal.textContent = els.humanLevel.value;
        chrome.storage.local.set({'value_humn': els.humanLevel.value});
    });

    els.styleSelect.addEventListener('change', () => {
        chrome.storage.local.set({'value_styk': els.styleSelect.value});
    });

    els.autoQueue.addEventListener('change', () => {
        chrome.storage.local.set({'value_nEw_ar': els.autoQueue.checked});
    });

    els.resetBtn.addEventListener('click', () => {
        // Reset to defaults
        const defaults = {
            'show_function': 'reset',
            'function_atpl': false,
            'mode_function': 'HUNT',
            'value_humn': '8',
            'value_styk': '3',
            'value_nEw_ar': false
        };
        chrome.storage.local.set(defaults, () => {
            location.reload();
        });
    });

    function updateVisibility() {
        const mode = els.modeSelect.value;
        els.humanLevelGroup.style.display = (mode === 'HUMN') ? 'flex' : 'none';
        els.styleGroup.style.display = (mode === 'STYK') ? 'flex' : 'none';
    }
});

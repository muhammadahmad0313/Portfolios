document.addEventListener('DOMContentLoaded', function() {
    // === COMMAND HISTORY FUNCTIONALITY ===
    let commandHistory = [];
    let historyIndex = -1;

    // --- THEME SWITCHER BUTTON ---
    // Add a button to the terminal header
    const terminalHeader = document.querySelector('.terminal-header');
    const themeBtn = document.createElement('button');
    themeBtn.textContent = '🎨 Theme';
    themeBtn.title = 'Switch Terminal Theme';
    themeBtn.style.cssText = `
        position: absolute;
        top: 2px;
        right: 20px;
        background: transparent;
        border: 1px solid var(--terminal-border);
        color: var(--terminal-green);
        border-radius: 6px;
        padding: 3px 12px;
        font-size: 1em;
        cursor: pointer;
        z-index: 10;
        transition: background 0.2s, color 0.2s, border 0.2s;
    `;
    themeBtn.onmouseover = () => themeBtn.style.background = 'rgba(0,255,0,0.08)';
    themeBtn.onmouseout = () => themeBtn.style.background = 'transparent';
    terminalHeader.style.position = 'relative';
    terminalHeader.appendChild(themeBtn);

    // Track manual theme override
    let manualThemeIndex = null;

    themeBtn.addEventListener('click', function() {
        // Cycle through themes
        if (manualThemeIndex === null) {
            // Start from current gallery theme or 0
            const activeIndex = Array.from(galleryItems).findIndex(item => item.classList.contains('active'));
            manualThemeIndex = (activeIndex + 1) % terminalThemes.length;
        } else {
            manualThemeIndex = (manualThemeIndex + 1) % terminalThemes.length;
        }
        applyTerminalTheme(terminalThemes[manualThemeIndex]);
        // Auto-focus the terminal input field after switching theme
        if (inputField) {
            inputField.focus();
            positionCursor();
        }
    });
    // Theme definitions for each profile image (gallery item)
    const terminalThemes = [
        // 0: VR Chair
        {
            '--terminal-bg': '#0a0f1a',
            '--terminal-text': '#e0e6f0',
            '--terminal-green': '#00ffe7',
            '--terminal-prompt': '#00ffe7',
            '--terminal-header': '#0a0f1a',
            '--terminal-border': '#00ffe7'
        },
        // 1: Trophy
        {
            '--terminal-bg': '#1a1200',
            '--terminal-text': '#ffe9a0',
            '--terminal-green': '#ffd700',
            '--terminal-prompt': '#ffd700',
            '--terminal-header': '#1a1200',
            '--terminal-border': '#ffd700'
        },
        // 2: Mind
        {
            '--terminal-bg': '#0a1a12',
            '--terminal-text': '#b8ffe0',
            '--terminal-green': '#00ff99',
            '--terminal-prompt': '#00ff99',
            '--terminal-header': '#0a1a12',
            '--terminal-border': '#00ff99'
        },
        // 3: Hero
        {
            '--terminal-bg': '#1a0a14',
            '--terminal-text': '#ffd6f5',
            '--terminal-green': '#ff00c8',
            '--terminal-prompt': '#ff00c8',
            '--terminal-header': '#1a0a14',
            '--terminal-border': '#ff00c8'
        },
        // 4: Back
        {
            '--terminal-bg': '#0a1a19',
            '--terminal-text': '#a0fff7',
            '--terminal-green': '#00eaff',
            '--terminal-prompt': '#00eaff',
            '--terminal-header': '#0a1a19',
            '--terminal-border': '#00eaff'
        }
    ];

    // Function to apply a theme by updating CSS variables
    function applyTerminalTheme(themeObj) {
        // === Update .profile-gallery box-shadow to match theme ===
        const galleryBox = document.querySelector('.profile-gallery');
        if (galleryBox) {
            // Use terminal-green for the glow
            const accent = themeObj['--terminal-green'] || '#ffd700';
            galleryBox.style.boxShadow = `0 15px 30px ${accent}55, 0 10px 10px rgba(0,0,0,0.3)`;
        }
        const root = document.documentElement;
        Object.entries(themeObj).forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });

        // === Update profile image shadow ===
        const profileImg = document.querySelector('.profile-image, .profile-img, .profile');
        // Use terminal-green for shadow color
        const shadowColor = themeObj['--terminal-green'] || '#ffd700';
        if (profileImg) {
            profileImg.style.boxShadow = `0 0 40px 0 ${shadowColor}, 0 0 80px 0 ${shadowColor}55`;
        }
        // Also update the glow below the image if present
        const profileGlow = document.querySelector('.profile-glow, .profile-shadow, .profile-glow-effect');
        if (profileGlow) {
            profileGlow.style.boxShadow = `0 0 80px 30px ${shadowColor}55, 0 0 120px 60px ${shadowColor}33`;
            profileGlow.style.background = `${shadowColor}22`;
        }

        // === Update journey/web nav item background and color ===
        const navBar = document.querySelector('.terminal-nav');
        if (navBar) {
            navBar.querySelectorAll('.nav-item').forEach(item => {
                if (["journey", "web"].includes(item.textContent.trim().toLowerCase())) {
                    item.style.background = shadowColor + '22';
                    item.style.color = shadowColor;
                }
            });
        }

        // === Update sudo-command theme to match selected theme ===
        document.querySelectorAll('.sudo-command').forEach(cmd => {
            cmd.style.color = shadowColor;
            cmd.style.background = shadowColor + '22';
            cmd.style.fontWeight = 'bold';
            cmd.style.borderRadius = '4px';
            cmd.style.padding = '0 0.3em';
            cmd.style.transition = 'background 0.2s, color 0.2s';
        });
    }
    const inputField = document.querySelector('.input-field');
    const terminalOutput = document.querySelector('.terminal-output');
    const terminalContent = document.querySelector('.terminal-content');
    const rightColumn = document.querySelector('.right-column');
    // Reorder nav items: move 'journey' and 'web' after 'help' and make them prominent
    const navBar = document.querySelector('.terminal-nav');
    if (navBar) {
        // Make sure navBar is a row flexbox
        navBar.style.display = 'flex';
        navBar.style.flexDirection = 'row';
        navBar.style.flexWrap = 'wrap';
        navBar.style.alignItems = 'center';
        navBar.style.gap = '0.7em';

        // Find all nav items
        const navItemsArr = Array.from(navBar.querySelectorAll('.nav-item'));
        const helpIdx = navItemsArr.findIndex(item => item.textContent.trim().toLowerCase() === 'help');
        const journeyIdx = navItemsArr.findIndex(item => item.textContent.trim().toLowerCase() === 'journey');
        const webIdx = navItemsArr.findIndex(item => item.textContent.trim().toLowerCase() === 'web');
        if (helpIdx !== -1 && journeyIdx !== -1 && webIdx !== -1) {
            // Remove journey and web
            const journeyItem = navItemsArr.splice(journeyIdx, 1)[0];
            // If web comes after journey, its index will have shifted
            const webItem = navItemsArr.splice(webIdx > journeyIdx ? webIdx - 1 : webIdx, 1)[0];
            // Insert journey and web after help
            navItemsArr.splice(helpIdx + 1, 0, journeyItem, webItem);
            // Clear and re-append in new order
            navBar.innerHTML = '';
            navItemsArr.forEach(item => navBar.appendChild(item));
        }
        // Make journey and web less shiny but still bold
        navBar.querySelectorAll('.nav-item').forEach(item => {
            if (['journey', 'web'].includes(item.textContent.trim().toLowerCase())) {
                item.style.color = '#ffe066';
                item.style.fontWeight = 'bold';
                item.style.textShadow = 'none';
                item.style.background = 'rgba(255, 224, 102, 0.13)';
                item.style.borderRadius = '4px';
                item.style.padding = '0 0.3em';
            }
        });
    }
    const navItems = document.querySelectorAll('.nav-item');
    
    // Improved function to auto-scroll to the bottom
    function scrollToBottom() {
        return new Promise((resolve) => {
            // Use requestAnimationFrame for smoother scrolling that works with browser paint cycles
            requestAnimationFrame(() => {
                // Specifically target the terminal output area for scrolling
                const terminalOutputArea = document.querySelector('.terminal-output');
                const initialHeight = terminalOutputArea.scrollHeight;
                
                terminalOutputArea.scrollTop = initialHeight;
                rightColumn.scrollTop = rightColumn.scrollHeight;
                
                // Force a second scroll with a slight delay to handle dynamic content
                setTimeout(() => {
                    // Check if content height has changed since our first scroll attempt
                    const newHeight = terminalOutputArea.scrollHeight;
                    
                    if (newHeight > initialHeight) {
                        terminalOutputArea.scrollTop = newHeight;
                        rightColumn.scrollTop = rightColumn.scrollHeight;
                    }
                    
                    resolve(); // Resolve the promise after scrolling is complete
                }, 30);
            });
        });
    }
    
    // Track sudo state
    let sudoMode = false;
    let sudoTimer = null;
    
    // Function to reset sudo mode after timeout
    function resetSudoMode() {
        // Clear any existing timer
        if (sudoTimer) {
            clearTimeout(sudoTimer);
        }
        
        // Set a new timer to expire sudo mode after 5 minutes
        sudoTimer = setTimeout(() => {
            if (sudoMode) {
                sudoMode = false;
                const timeoutMsg = document.createElement('div');
                timeoutMsg.className = 'output';
                timeoutMsg.innerHTML = `<p style="color: #ff5555;">Sudo session expired for security reasons.</p>`;
                terminalOutput.appendChild(timeoutMsg);
                scrollToBottom();
            }
        }, 5 * 60 * 1000); // 5 minutes
    }
    
    // Commands available in the terminal
    const commands = {
        help: function() {
            return `
                <p class="project-header">ℹ️ Available Commands:</p>
                <p>about - Learn about me</p>
                <p>projects - View my portfolio projects</p>
                <p>skills - See my technical skills</p>
                <p>experience - View my work experience</p>
                <p>education - My educational background</p>
                <p>certifications - List of my certifications</p>
                <p>contact - How to get in touch with me</p>
                <p>leadership - My leadership experiences</p>
                <p>journey - Open my journey site (requires sudo)</p>
                <p>web - Open my web projects site (requires sudo)</p>
                <p>clear - Clear the terminal</p>
                <p>sudo - Gain elevated privileges</p>
            `;
        },
        about: function() {
            return `
                <p class="project-header">👋 About Me:</p>
                
                <p>Hi! I'm a student at FAST NUCES, pursuing a BS in Software Engineering.</p>
                <p>I'm a web developer, AR/VR developer, game developer, and .NET Framework developer.</p>
                <p>I'm passionate about building innovative solutions and exploring new technologies in software and game development.</p>
            `;
        },
        projects: function() {
            return `
                <p class="project-header">🚀 Projects:</p>
                
                <div class="project">
                    <p class="project-number">1. Lost &amp; Found Portal (FAST NUCES)</p>
                    <p>Campus portal for reporting and finding lost items (with admin panel)</p>
                    <p>Technologies: React, Node.js, Express, PostgreSQL (Neon), Nodemailer, JWT, Cloudinary</p>
                    <p>Link: <a href="https://lostandfound-gamma.vercel.app/" target="_blank">Lost & Found Portal</a></p>
                </div>
                
                <div class="project">
                    <p class="project-number">2. Quizify</p>
                    <p>Quiz web app for students and teachers (with admin features)</p>
                    <p>Technologies: React, Java, Spring Boot</p>
                    <p>Docs: ACD, DCD, Sequence Diagram, Use Case Diagram, Package Diagram, SAD</p>
                </div>
                
                <div class="project">
                    <p class="project-number">3. Amazon Clone</p>
                    <p>Clone of Amazon's e-commerce UI</p>
                    <p>Technologies: Html, CSS, JavaScript</p>
                </div>
                
                <div class="project">
                    <p class="project-number">4. Sports Website</p>
                    <p>Sports news and stats portal</p>
                    <p>Technologies: HTML, CSS, JavaScript, GSAP</p>
                </div>
                
                <div class="project">
                    <p class="project-number">5. Duo Digital Craft Website</p>
                    <p>Business website for a digital craft company</p>
                    <p>Technologies: HTML, CSS, JavaScript, GSAP, Locomotive Scroll</p>
                </div>
                
                <div class="project">
                    <p class="project-number">6. 3D Solar System Website</p>
                    <p>Interactive 3D solar system visualization</p>
                    <p>Technologies: HTML, CSS, Three.js, JavaScript</p>
                </div>
                
                <div class="project">
                    <p class="project-number">7. Canvas-Based Website</p>
                    <p>Creative web experiments using Canvas API</p>
                    <p>Technologies: HTML, CSS, JavaScript, Canvas API</p>
                </div>
                
                <div class="project">
                    <p class="project-number">8. Web Games</p>
                    <p>Fun games: Tic Tac Toe, Rock Paper Scissors, Bubble Smasher, Rectangle Placer</p>
                    <p>Technologies: JavaScript, HTML, CSS, GSAP</p>
                </div>
                
                <p class="project-header" style="margin-top:1em;">🕶️ AR Projects:</p>
                <div class="project">
                    <p>IKEA Clone (AR furniture placement), Portfolio Card AR, Plants AR, Video AR</p>
                    <p>Technologies: Unity, AR Foundation, Vuforia, 8th Wall</p>
                </div>
                
                <p class="project-header" style="margin-top:1em;">🎮 Game Development:</p>
                <div class="project">
                    <p>2D Monster Chase, 3D Endless Runner, 3D Boxing Game</p>
                    <p>Technologies: Unity, C#</p>
                </div>
                
                <p class="project-header" style="margin-top:1em;">🟦 .NET Projects:</p>
                <div class="project">
                    <p>Fast Electrics, Student Management System</p>
                    <p>Technologies: .NET Framework, CLR, C++</p>
                </div>
                
                <p class="project-header" style="margin-top:1em;">⚙️ Assembly:</p>
                <div class="project">
                    <p>Ping Pong Game</p>
                    <p>Technologies: Assembly Language</p>
                </div>
            `;
        },
        skills: function() {
            return `
                <p class="project-header">💻 Skills:</p>
                <ul class="skills-list">
                    <li>
                        <strong>Frontend:</strong>
                        <span>React, Three.js, HTML, CSS (Tailwind, SCSS)</span>
                    </li>
                    <li>
                        <strong>Backend:</strong>
                        <span>Java (Spring Boot), JavaScript (Express), C, C++, C#, Assembly</span>
                    </li>
                    <li>
                        <strong>Databases:</strong>
                        <span>PostgreSQL, SSMS, Neon, Firebase</span>
                    </li>
                    <li>
                        <strong>Deployment:</strong>
                        <span>Vercel, Railway</span>
                    </li>
                    <li>
                        <strong>DevOps:</strong>
                        <span>Docker</span>
                    </li>
                    <li>
                        <strong>Development Tools:</strong>
                        <span>Visual Studio, VS Code, VS Code Insiders, IntelliJ, Postman, Unity, MATLAB, pgAdmin, SSMS</span>
                    </li>
                    <li>
                        <strong>Collaboration:</strong>
                        <span>Slack, GitHub, Jira, Notion</span>
                    </li>
                    <li>
                        <strong>AR/VR/WebAR:</strong>
                        <span>AR Foundation, Vuforia, 8th Wall, Model Viewer, A-Frame</span>
                    </li>
                </ul>
            `;
        },
        experience: function() {
            return `
                <p class="project-header">👨‍💼 Experience:</p>
                
                <div class="project">
                    <p><strong>AR/VR Intern | EggyStudio</strong> (June 2025 - Present)</p>
                    <p>- Developing immersive AR/VR experiences using Unity and AR Foundation</p>
                    <p>- Collaborating with designers and engineers to prototype interactive applications</p>
                    <p>- Researching and implementing new features for real-time 3D environments</p>
                </div>
            `;
        },
        education: function() {
            return `
                <p class="project-header">🎓 Education:</p>
                
                <div class="project">
                    <p><strong>Bachelor of Science in Software Engineering (BSSE)</strong></p>
                    <p>FAST National University of Computer and Emerging Sciences</p>
                    <p>Batch 2023 - 2027</p>
                    <p>Currently a 5th semester student</p>
                </div>
            `;
        },
        certifications: function() {
            return `
               <p class="project-header" style="margin-top:1em;">🏅 Speed Programming Competitions:</p>
                <p>- ACM FAST Speed Programming Competition</p>
                <p>- UCP Takra Speed Programming Competition</p>
                <p>- ITU Code Rush Speed Programming Competition</p>
            `;
        },
        contact: function() {
            return `
                <p class="project-header">📬 Contact Information:</p>
                
                <p><i class="fas fa-envelope"></i> Email: <a href="mailto:m.ahmad.software.engineer@gmail.com">m.ahmad.software.engineer@gmail.com</a></p>
                <p><i class="fab fa-github"></i> GitHub: <a href="https://github.com/muhammadahmad0313" target="_blank">github.com/muhammadahmad0313</a></p>
                <p><i class="fab fa-linkedin"></i> LinkedIn: <a href="https://www.linkedin.com/in/muhammad-ahmad-butt-0324b036a/" target="_blank">linkedin.com/in/muhammad-ahmad-butt-0324b036a</a></p>
                <p><i class="fab fa-instagram"></i> Instagram: <a href="https://instagram.com/introvertahmad" target="_blank">@introvertahmad</a></p>
                <p><i class="fas fa-globe"></i> Website: <span style="color:#888;">Coming soon</span></p>
            `;
        },
        leadership: function() {
            return `
                <p class="project-header">👥 Leadership:</p>
                
                <div class="project">
                    <p><strong>Team Lead | Semester 1</strong></p>
                    <p>- Led the development of a C++ based Hospital Management System</p>
                </div>
                
                <div class="project">
                    <p><strong>Team Lead | Semester 4</strong></p>
                    <p>- Led "Fast Electrics" project using .NET Framework</p>
                </div>
                
                <div class="project">
                    <p><strong>Team Lead | Semester 5</strong></p>
                    <p>- Led "Quizify", a web app built with React and Java</p>
                </div>
            `;
        },
        clear: function() {
            // Add fade-out animation before clearing
            Array.from(terminalOutput.children).forEach((child, index) => {
                // Add animation with staggered delay
                child.style.animation = `fadeOut 0.15s ease-in forwards`;
                child.style.animationDelay = `${index * 0.02}s`;
            });
            
            // Clear after animation finishes
            setTimeout(() => {
                terminalOutput.innerHTML = '';
            }, 500);
            
            return '';
        },
        sudo: function() {
            // Toggle sudo mode
            sudoMode = true;
            
            // Set the sudo timeout
            resetSudoMode();
            
            return `
                <p class="project-header" style="color: #00ff00;">🔓 Sudo Access Granted</p>
                <p>Welcome, root user! You now have elevated privileges.</p>
                <p>Type <span class="highlight-text">'sudo [command]'</span> to execute privileged commands.</p>
                <p>Available privileged commands:</p>
                <p><span class="sudo-command">journey</span> - Access the journey section</p>
                <p><span class="sudo-command">web</span> - Access web projects</p>
                <p class="glitch-effect" style="--i:3; font-size: 0.8em; opacity: 0.7;">Session will timeout in 5 minutes for security reasons.</p>
            `;
        },
        
        journey: function() {
            if (!sudoMode) {
                return `
                    <p class="project-header glitch-effect" style="--i:1;">🔒 Permission Denied</p>
                    <p style="color: #ff5555;" class="glitch-effect" style="--i:2;">Access to journey section requires sudo privileges.</p>
                    <p class="glitch-effect" style="--i:3;">Try: sudo journey</p>
                `;
            }
            sudoMode = false;
            setTimeout(() => {
                window.open('https://journey-vert-nu.vercel.app/', '_blank');
            }, 1200);
            return `
                <p class="project-header" style="color: #00ff00;">🚀 Access Granted</p>
                <p>Opening journey site in a new tab...</p>
                <p class="loading-animation">
                    <span class="loading-dot">.</span>
                    <span class="loading-dot">.</span>
                    <span class="loading-dot">.</span>
                </p>
            `;
        },
        
        web: function() {
            if (!sudoMode) {
                return `
                    <p class="project-header glitch-effect" style="--i:1;">🔒 Permission Denied</p>
                    <p style="color: #ff5555;" class="glitch-effect" style="--i:2;">Access to web projects section requires sudo privileges.</p>
                    <p class="glitch-effect" style="--i:3;">Try: sudo web</p>
                `;
            }
            sudoMode = false;
            setTimeout(() => {
                window.open('https://web-pied-beta.vercel.app/', '_blank');
            }, 1200);
            return `
                <p class="project-header" style="color: #00ff00;">🚀 Access Granted</p>
                <p>Opening web projects site in a new tab...</p>
                <p class="loading-animation">
                    <span class="loading-dot">.</span>
                    <span class="loading-dot">.</span>
                    <span class="loading-dot">.</span>
                </p>
            `;
        }
    };
    
    // Add event listeners to navigation items
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const command = this.textContent;
            const contentLength = processCommand(command);
            // Calculate appropriate delay based on content length
            const typingDelay = contentLength > 500 ? contentLength : Math.max(contentLength * 5, 500);
            // Scroll to bottom when a nav item is clicked (like Enter key press)
            scrollToBottom();
            // Scroll again after content likely finished rendering
            setTimeout(() => {
                scrollToBottom();
                setTimeout(scrollToBottom, 300); // One final scroll for safety
            }, typingDelay);
        });
    });

    // === THEME SWITCHING BASED ON PROFILE IMAGE ===
    // Find gallery items and set up theme switching
    const galleryItems = document.querySelectorAll('.gallery-item');
    function setThemeByActiveGallery() {
        if (manualThemeIndex !== null) return; // Don't override manual theme
        const activeIndex = Array.from(galleryItems).findIndex(item => item.classList.contains('active'));
        if (activeIndex >= 0 && terminalThemes[activeIndex]) {
            applyTerminalTheme(terminalThemes[activeIndex]);
        }
    }

    // If user switches gallery image, reset manual theme override
    function resetManualTheme() {
        manualThemeIndex = null;
        setThemeByActiveGallery();
    }

    // Observe gallery changes (auto-rotation or manual)
    const observer = new MutationObserver(() => {
        setThemeByActiveGallery();
    });
    galleryItems.forEach(item => {
        observer.observe(item, { attributes: true, attributeFilter: ['class'] });
        item.addEventListener('click', resetManualTheme);
    });

    // Initial theme: set yellow (index 1) as default
    applyTerminalTheme(terminalThemes[1]);
    manualThemeIndex = 1;
    
    // Focus input field when clicking in the right column (terminal part) without scrolling
    rightColumn.addEventListener('click', function() {
        inputField.focus();
        positionCursor();
        // Removed auto-scrolling here to allow users to read previous content
    });
    
    // Add click event listeners to sudo command hints when they appear
    function addSudoCommandListeners() {
        // Use a MutationObserver to detect when sudo command hints are added to the DOM
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length) {
                    // Look for sudo-command elements in the added nodes
                    const sudoCommands = document.querySelectorAll('.sudo-command');
                    
                    sudoCommands.forEach((cmd) => {
                        // Remove existing listeners to prevent duplicates
                        cmd.removeEventListener('click', sudoCommandClickHandler);
                        
                        // Add click event
                        cmd.addEventListener('click', sudoCommandClickHandler);
                    });
                }
            });
        });
        
        // Start observing the terminal output
        observer.observe(terminalOutput, { childList: true, subtree: true });
    }
    
    // Click handler for sudo command hints
    function sudoCommandClickHandler(e) {
        const commandName = e.target.textContent.trim();
        
        // Execute the command with sudo
        inputField.value = `sudo ${commandName}`;
        
        // Trigger an Enter keypress event
        const enterEvent = new KeyboardEvent('keydown', {
            key: 'Enter',
            code: 'Enter',
            keyCode: 13,
            bubbles: true
        });
        
        inputField.dispatchEvent(enterEvent);
    }
    
    // Initialize sudo command listeners
    addSudoCommandListeners();

    // Process user input on Enter key and handle Tab completion
    inputField.addEventListener('keydown', function(e) {
        // Update cursor position after key processing
        setTimeout(positionCursor, 1);

        // === Command History Navigation ===
        if (e.key === 'ArrowUp') {
            if (commandHistory.length > 0) {
                if (historyIndex === -1) {
                    historyIndex = commandHistory.length - 1;
                } else if (historyIndex > 0) {
                    historyIndex--;
                }
                inputField.value = commandHistory[historyIndex];
                setTimeout(positionCursor, 1);
            }
            e.preventDefault();
            return;
        }
        if (e.key === 'ArrowDown') {
            if (commandHistory.length > 0 && historyIndex !== -1) {
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    inputField.value = commandHistory[historyIndex];
                } else {
                    historyIndex = -1;
                    inputField.value = '';
                }
                setTimeout(positionCursor, 1);
            }
            e.preventDefault();
            return;
        }

        // Tab completion
        if (e.key === 'Tab') {
            e.preventDefault(); // Prevent default tab behavior

            const input = inputField.value.trim().toLowerCase();
            const availableCommands = Object.keys(commands);

            // Find matching commands based on current input
            const matchingCommands = availableCommands.filter(cmd => cmd.startsWith(input));

            if (matchingCommands.length === 1) {
                // If only one match, complete the command
                inputField.value = matchingCommands[0];
                positionCursor();
            } else if (matchingCommands.length > 1 && input !== '') {
                // If multiple matches, find common prefix
                let commonPrefix = input;
                let position = input.length;
                let allSame = true;

                while (allSame && position < matchingCommands[0].length) {
                    const char = matchingCommands[0][position];

                    for (let i = 1; i < matchingCommands.length; i++) {
                        if (position >= matchingCommands[i].length || matchingCommands[i][position] !== char) {
                            allSame = false;
                            break;
                        }
                    }

                    if (allSame) {
                        commonPrefix += char;
                        position++;
                    }
                }

                // Update input with common prefix
                inputField.value = commonPrefix;
                positionCursor();

                // If pressing tab twice and multiple options, show available options
                if (input === commonPrefix && matchingCommands.length > 1) {
                    // Create temporary output to show options
                    const tempOutput = document.createElement('div');
                    tempOutput.className = 'output';
                    tempOutput.innerHTML = `<p>Available commands: ${matchingCommands.join(', ')}</p>`;
                    terminalOutput.appendChild(tempOutput);
                    // Auto-scroll here to show the command options (necessary for usability)
                    scrollToBottom().then(() => {
                        // Do another scroll after a brief delay to ensure everything is visible
                        setTimeout(scrollToBottom, 50);
                    });
                }
            }
        }

        if (e.key === 'Enter') {
            const input = inputField.value.trim().toLowerCase();

            // Add to history if not empty and not duplicate of last
            if (input && (commandHistory.length === 0 || commandHistory[commandHistory.length - 1] !== input)) {
                commandHistory.push(input);
            }
            historyIndex = -1;

            // Clear the input field first
            inputField.value = '';

            // Process the command and get the content length to calculate scroll delay
            const contentLength = processCommand(input);

            // Calculate an appropriate delay based on content length
            // This ensures we scroll after the typing animation completes
            const typingDelay = contentLength > 500 ? contentLength : Math.max(contentLength * 5, 500);

            // Schedule scrolls with progressively increasing delays
            // First immediate scroll for the command entry
            scrollToBottom();

            // Then scroll after content starts rendering
            setTimeout(scrollToBottom, 100);

            // Final scroll after typing animation should be complete
            setTimeout(scrollToBottom, typingDelay);

            // Extra safety scroll
            setTimeout(scrollToBottom, typingDelay + 300);

            // Reset cursor position
            positionCursor();
        }
    });
    
    // Improved function to animate text typing effect with progressive scrolling
    function typeWriterEffect(element, html, speed = 5) {
        // Create a temporary div to parse the HTML content
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        
        // Get all the child nodes
        const nodes = Array.from(tempDiv.childNodes);
        element.innerHTML = '';
        
        let currentNodeIndex = 0;
        let currentCharIndex = 0;
        let currentNode = null;
        let currentTextNode = null;
        let isInTag = false;
        let tagBuffer = '';
        let currentNodeContent = '';
        let charCount = 0;
        let totalChars = 0;
        
        // Calculate total characters for progress tracking
        nodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                totalChars += node.textContent.length;
            }
        });
        
        function typeNextCharacter() {
            // If we're done with all nodes, perform one final scroll and return
            if (currentNodeIndex >= nodes.length) {
                scrollToBottom();
                return;
            }
            
            // If we need to start a new node
            if (currentNode === null) {
                currentNode = nodes[currentNodeIndex].cloneNode(true);
                
                // If this is an element node (not text)
                if (currentNode.nodeType === Node.ELEMENT_NODE) {
                    element.appendChild(currentNode);
                    currentNodeIndex++;
                    currentNode = null;
                    // Continue with next node immediately
                    setTimeout(typeNextCharacter, 0);
                    return;
                } else {
                    // This is a text node
                    currentTextNode = document.createTextNode('');
                    element.appendChild(currentTextNode);
                    currentNodeContent = currentNode.textContent;
                    currentCharIndex = 0;
                }
            }
            
            // Type the next character of the current text node
            if (currentCharIndex < currentNodeContent.length) {
                currentTextNode.textContent += currentNodeContent[currentCharIndex++];
                charCount++;
                
                // Scroll periodically during typing for a better experience
                // Scroll when we reach 25%, 50%, 75% and 100% of content
                if (totalChars > 100 && charCount % Math.floor(totalChars / 4) === 0) {
                    scrollToBottom();
                }
                
                setTimeout(typeNextCharacter, speed);
            } else {
                // Move to next node
                currentNodeIndex++;
                currentNode = null;
                setTimeout(typeNextCharacter, speed);
            }
        }
        
        // Start the typing animation
        typeNextCharacter();
    }

    function processCommand(input) {
        // Create command line element
        const commandLineElement = document.createElement('div');
        commandLineElement.className = 'command-line';
        
        // Determine if this is a prompt with sudo
        let promptText = sudoMode ? 'root@portfolio:~#' : 'ahmad@portfolio:~$';
        
        // Update command prompt in the input area to match current sudo state
        const commandPrompt = document.querySelector('.command-input .prompt');
        if (commandPrompt) {
            commandPrompt.textContent = sudoMode ? 'root@portfolio:~#' : 'ahmad@portfolio:~$';
            positionCursor(); // Reposition cursor after prompt changes
        }
        
        commandLineElement.innerHTML = `
            <span class="prompt">${promptText}</span>
            <span class="command">${input}</span>
        `;
        
        // Create output element
        const outputElement = document.createElement('div');
        outputElement.className = 'output';
        
        // Append command line immediately
        terminalOutput.appendChild(commandLineElement);
        terminalOutput.appendChild(outputElement);
        
        let contentLength = 0;
        
        // Special case: rm -rf (no sudo)
        if (input.trim() === 'rm -rf') {
            const funnyMsg = `<p style="color:#ff5555;font-weight:bold;">😈 Permission denied: You need sudo privileges to destroy the universe!</p><p style="color:#888;">(Nice try...)</p>`;
            contentLength = funnyMsg.length;
            typeWriterEffect(outputElement, funnyMsg, 5);
            return contentLength;
        }

        // Special case: sudo rm -rf
        if (input.trim() === 'sudo rm -rf') {
            // Enable sudo mode for effect
            sudoMode = true;
            const destroyMsg = `<p style="color:#ff2222;font-weight:bold;font-size:1.2em;">💥 Sudo Access Granted: Executing <span style='font-family:monospace;'>rm -rf /</span> ...</p><p style="color:#ff5555;">Warning: This will destroy everything!</p><div class="destruction-animation"></div>`;
            contentLength = destroyMsg.length;
            typeWriterEffect(outputElement, destroyMsg, 2);
            setTimeout(() => {
                triggerDestructionAnimation();
            }, 1200);
            return contentLength;
        }

        // Check for sudo command pattern: "sudo command"
        if (input.startsWith('sudo ')) {
            const actualCommand = input.substring(5); // Remove 'sudo ' prefix
            // Temporarily enable sudo mode
            sudoMode = true;
            if (commands[actualCommand]) {
                const outputHTML = commands[actualCommand]();
                contentLength = outputHTML.length;
                const speed = outputHTML.length > 500 ? 1 : outputHTML.length > 200 ? 3 : 5;
                typeWriterEffect(outputElement, outputHTML, speed);
            } else {
                const errorMsg = `<p>bash: ${actualCommand}: command not found</p>`;
                contentLength = errorMsg.length;
                typeWriterEffect(outputElement, errorMsg, 5);
                // Reset sudo mode if command fails
                sudoMode = false;
            }
        }
        // Normal command processing
        else if (input in commands) {
            const outputHTML = commands[input]();
            contentLength = outputHTML.length;
            // Use faster typing for longer outputs, slower for shorter ones for better UX
            const speed = outputHTML.length > 500 ? 1 : outputHTML.length > 200 ? 3 : 5;
            typeWriterEffect(outputElement, outputHTML, speed);
        } else if (input === '') {
            // Do nothing for empty input
            return 0;
        } else {
            const errorMsg = `<p>bash: ${input}: command not found</p>`;
            contentLength = errorMsg.length;
            typeWriterEffect(outputElement, errorMsg, 5);
        }
    // === Destruction Animation for sudo rm -rf ===
    function triggerDestructionAnimation() {
        // Add a full-screen overlay
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.background = 'radial-gradient(circle, #ff2222 0%, #000 100%)';
        overlay.style.zIndex = '99999';
        overlay.style.pointerEvents = 'none';
        overlay.style.display = 'flex';
        overlay.style.flexDirection = 'column';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.animation = 'destructFadeIn 0.7s cubic-bezier(.68,-0.55,.27,1.55)';

        // Add animated text
        const boom = document.createElement('div');
        boom.textContent = '💣 BOOM!';
        boom.style.fontSize = '5vw';
        boom.style.fontWeight = 'bold';
        boom.style.color = '#fff';
        boom.style.textShadow = '0 0 40px #ff2222, 0 0 80px #fff';
        boom.style.animation = 'shake 0.7s cubic-bezier(.36,.07,.19,.97) both';
        overlay.appendChild(boom);

        // Add crumbling effect to body
        document.body.style.transition = 'filter 1.2s cubic-bezier(.68,-0.55,.27,1.55)';
        document.body.style.filter = 'grayscale(1) blur(6px) brightness(0.3)';

        // Add overlay to page
        document.body.appendChild(overlay);

        // Animate all main content out (simulate destruction)
        setTimeout(() => {
            document.body.querySelectorAll('main, .terminal-content, .right-column, .profile-gallery, .terminal-header, .terminal-nav').forEach(el => {
                el.style.transition = 'transform 1.2s cubic-bezier(.68,-0.55,.27,1.55), opacity 1.2s';
                el.style.transform = 'scale(0.7) rotate(-8deg) translateY(80px)';
                el.style.opacity = '0';
            });
        }, 500);

        // Add CSS keyframes for shake and fade
        if (!document.getElementById('destruct-anim-style')) {
            const style = document.createElement('style');
            style.id = 'destruct-anim-style';
            style.innerHTML = `
                @keyframes shake {
                    10%, 90% { transform: translate3d(-2px, 0, 0); }
                    20%, 80% { transform: translate3d(4px, 0, 0); }
                    30%, 50%, 70% { transform: translate3d(-8px, 0, 0); }
                    40%, 60% { transform: translate3d(8px, 0, 0); }
                }
                @keyframes destructFadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }

        // After a few seconds, show a funny message and reload
        setTimeout(() => {
            boom.textContent = '💀 Website Destroyed!';
            boom.style.fontSize = '3vw';
            boom.style.color = '#ff2222';
            boom.style.textShadow = '0 0 40px #fff, 0 0 80px #ff2222';
            const msg = document.createElement('div');
            msg.innerHTML = '<p style="color:#fff;font-size:1.5vw;margin-top:2vw;">Just kidding!<br>Press <b>F5</b> or <b>refresh</b> to restore the universe.</p>';
            overlay.appendChild(msg);
        }, 2200);
    }
        
        // Return content length to help calculate scroll timing
        return contentLength;
    }
    
    // Initialize by focusing on input field and doing initial scroll to show welcome message
    inputField.focus();
    scrollToBottom().then(() => {
        // Double-check that initial content is visible
        setTimeout(scrollToBottom, 100);
    });
    
    // Create cursor element
    function createCursor() {
        const cursor = document.createElement('span');
        cursor.className = 'cursor';
        return cursor;
    }
    
    // Add custom cursor after prompt
    function addCustomCursor() {
        const commandInput = document.querySelector('.command-input');
        const existingCursor = commandInput.querySelector('.cursor');
        
        if (!existingCursor) {
            const cursor = createCursor();
            commandInput.appendChild(cursor);
            positionCursor();
        }
    }
    
    // Position cursor relative to text input
    function positionCursor() {
        const commandInput = document.querySelector('.command-input');
        let cursor = commandInput.querySelector('.cursor');
        
        if (!cursor) {
            cursor = createCursor();
            commandInput.appendChild(cursor);
        }
        
        const prompt = commandInput.querySelector('.prompt');
        const promptRect = prompt.getBoundingClientRect();
        
        // Calculate position based on text length
        const textWidth = getTextWidth(inputField.value);
        
        cursor.style.position = 'absolute';
        cursor.style.left = `${promptRect.width + textWidth + 32}px`; // Fine-tuned for perfect spacing
        cursor.style.top = '50%';
        cursor.style.transform = 'translateY(-50%)';
    }
    
    // Helper function to calculate text width
    function getTextWidth(text) {
        // Create a temporary span to measure text
        const span = document.createElement('span');
        span.style.visibility = 'hidden';
        span.style.position = 'absolute';
        span.style.font = window.getComputedStyle(inputField).font;
        span.innerText = text;
        document.body.appendChild(span);
        
        const width = span.offsetWidth;
        document.body.removeChild(span);
        
        return width;
    }
    
    // Update cursor position when typing (without auto-scrolling)
    inputField.addEventListener('input', function() {
        positionCursor();
        // Removed scrollToBottom() here to allow users to read previous content while typing
    });
    
    // Create tab hint element
    function createTabHint() {
        const commandInput = document.querySelector('.command-input');
        let tabHint = commandInput.querySelector('.tab-hint');
        
        if (!tabHint) {
            tabHint = document.createElement('span');
            tabHint.className = 'tab-hint';
            tabHint.textContent = 'TAB to complete';
            commandInput.appendChild(tabHint);
        }
        
        return tabHint;
    }
    
    // Show/hide tab hint based on input
    inputField.addEventListener('input', function() {
        const input = inputField.value.trim().toLowerCase();
        const availableCommands = Object.keys(commands);
        const matchingCommands = availableCommands.filter(cmd => cmd.startsWith(input));
        
        const tabHint = createTabHint();
        
        if (input.length > 0 && matchingCommands.length > 0 && input !== matchingCommands[0]) {
            tabHint.classList.add('visible');
        } else {
            tabHint.classList.remove('visible');
        }
        
        positionCursor();
    });
    
    // Initialize cursor and tab hint
    addCustomCursor();
    createTabHint();
    
    // Handle window resize - only update cursor position without forcing scroll
    window.addEventListener('resize', function() {
        positionCursor();
    });
    
    // We've removed the aggressive auto-scrolling from MutationObserver and ResizeObserver
    // to allow users to scroll up and read previous content without being forced back down
    
    // Removed the auto-scrolling on scroll events to prevent interfering with manual scrolling
    
    // We've removed the typing activity tracking since we no longer auto-scroll during typing
    // This allows users to freely scroll through terminal content without interference
    
    // Completely remove the interval-based auto-scrolling
    // This allows users to manually scroll through content without interruption
});

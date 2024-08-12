       // Initialize particles.js
       particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": true,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 0.8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });

    // Theme toggle
    const toggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    toggleButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
    });

    // Form field real-time preview
    const form = document.getElementById('embedForm');
    const previewDiv = document.getElementById('embed-preview');

    function updatePreview() {
        const username = document.getElementById('username').value;
        const avatarUrl = document.getElementById('avatarUrl').value;
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const thumbnail = document.getElementById('thumbnail').value;
        const image = document.getElementById('image').value;
        const footerUrl = document.getElementById('footerUrl').value;
        const footer = document.getElementById('footer').value;
        const color = document.getElementById('color').value;
        const timestampChecked = document.getElementById('timestamp').checked;
        const message = document.getElementById('message').value;

        let fieldsHtml = '';
        document.querySelectorAll('.field-container').forEach((container) => {
            const fieldName = container.querySelector('.field-name').value;
            const fieldValue = container.querySelector('.field-value').value;
            if (fieldName && fieldValue) {
                fieldsHtml += `<div><strong>${fieldName}</strong>: ${fieldValue}</div>`;
            }
        });

        previewDiv.innerHTML = `
            ${message ? `<p>${message}</p>` : ''}
            <div style="border: 2px solid ${color}; padding: 10px; border-radius: 5px; background-color: #36393f;">
                ${username ? `<div style="display: flex; align-items: center;"><img src="${avatarUrl}" style="width: 40px; height: 40px; border-radius: 50%;" alt="Avatar"/> <strong>${username}</strong></div>` : ''}
                ${title ? `<h3>${title}</h3>` : ''}
                ${description ? `<p>${description}</p>` : ''}
                ${thumbnail ? `<img src="${thumbnail}" style="max-width: 100%; border-radius: 5px;" alt="Thumbnail"/>` : ''}
                ${image ? `<img src="${image}" style="max-width: 100%; border-radius: 5px;" alt="Image"/>` : ''}
                ${footer ? `<div style="margin-top: 10px; display: flex; align-items: center;"><img src="${footerUrl}" style="width: 20px; height: 20px; margin-right: 5px;" alt="Footer Icon"/> ${footer}</div>` : ''}
                ${fieldsHtml ? `<div style="margin-top: 10px;">${fieldsHtml}</div>` : ''}
                ${timestampChecked ? `<div style="margin-top: 10px;">Timestamp: ${new Date().toLocaleString()}</div>` : ''}
            </div>
        `;
    }

    // Add event listeners to form inputs
    document.querySelectorAll('#embedForm input, #embedForm textarea').forEach(input => {
        input.addEventListener('input', updatePreview);
    });

    // Add field functionality
    document.getElementById('add-field').addEventListener('click', () => {
        const container = document.getElementById('fields-container');
        const fieldHtml = `
            <div class="field-container">
                <input type="text" class="field-name" placeholder="Field Name">
                <input type="text" class="field-value" placeholder="Field Value">
                <button type="button" class="remove-field">Remove</button>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', fieldHtml);

        // Add event listener to remove button
        container.querySelectorAll('.remove-field').forEach(button => {
            button.addEventListener('click', (e) => {
                e.target.parentElement.remove();
                updatePreview();
            });
        });

        updatePreview();
    });

    // Handle form submission
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const webhookUrl = document.getElementById('webhookUrl').value;
        const username = document.getElementById('username').value;
        const avatarUrl = document.getElementById('avatarUrl').value;
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const thumbnail = document.getElementById('thumbnail').value;
        const image = document.getElementById('image').value;
        const footerUrl = document.getElementById('footerUrl').value;
        const footer = document.getElementById('footer').value;
        const color = document.getElementById('color').value;
        const timestampChecked = document.getElementById('timestamp').checked;
        const message = document.getElementById('message').value;

        const fields = Array.from(document.querySelectorAll('.field-container')).map(container => {
            const fieldName = container.querySelector('.field-name').value;
            const fieldValue = container.querySelector('.field-value').value;
            return { name: fieldName, value: fieldValue };
        });

        const payload = {
            username,
            avatar_url: avatarUrl,
            embeds: [{
                title,
                description,
                thumbnail: { url: thumbnail },
                image: { url: image },
                footer: {
                    text: footer,
                    icon_url: footerUrl
                },
                color: parseInt(color.replace('#', ''), 16),
                timestamp: timestampChecked ? new Date().toISOString() : null,
                fields
            }],
            content: message // Add the normal message to the payload
        };

        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert('Embed sent successfully!');
            } else {
                alert('Failed to send embed.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred.');
        }
    });

    // Initial preview update
    updatePreview();
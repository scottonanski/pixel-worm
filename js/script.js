
		var canvas = document.querySelector('canvas');
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		var c = canvas.getContext('2d');

		var mouse = {
			x: undefined,
			z: undefined
		}

		var maxRadius = 27;
		var minRadius = 2;

		window.addEventListener('mousemove',

			function(event) {

				mouse.x = event.x;
				mouse.y = event.y;

			})

		// redraw the canvas upon window resize.

		window.addEventListener('resize', function() {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;

			init();

		});

		function Circle(x, y, dx, dy, radius) {

			this.x = x;
			this.y = y;
			this.dx = dx;
			this.dy = dy;
			this.radius = radius;
			this.minRadius = minRadius;

			this.draw = function() {

				c.beginPath();
				c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
				c.fillStyle = 'rgba(255, 216, 0, 0.50)';
				c.fill();
			}

			this.update = function() {

				if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
					this.dx = -this.dx;
				}
				if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
					this.dy = -this.dy
				}
				this.x += this.dx;
				this.y += this.dy;

				//interactivity

				if (mouse.x - this.x < 25 && mouse.x - this.x > -25 &&
					mouse.y - this.y < 25 && mouse.y - this.y > -25) {
					if (this.radius < maxRadius) {
						this.radius += 25;
					}

				} else if (this.radius > minRadius) {
					this.radius -= 0.25;
				}

				this.draw();
			}
		}

		var circleArray = [];

		function init() {

			circleArray = [];

			for (var i = 0; i < 3500; i++) {

				var radius = Math.random() * 2 + 1;
				var x = Math.random() * (innerWidth - radius * 2) + radius;
				var y = Math.random() * (innerHeight - radius * 2) + radius;
				var dx = (Math.random() - 0.5) * 1;
				var dy = (Math.random() - 0.5) * 1;

				circleArray.push(new Circle(x, y, dx, dy, radius));
			}

		}

		function animate() {
			requestAnimationFrame(animate);
			c.clearRect(0, 0, innerWidth, innerHeight);

			for (var i = 0; i < circleArray.length; i++) {

				circleArray[i].update();
			}
		}

		init();
		animate();

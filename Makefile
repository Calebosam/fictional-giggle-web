build-image:
	docker build -t caleb9083/fictional-giggle-web .

start-container:
	docker run -p 3002:3000 --name web-giggle caleb9083/fictional-giggle-web
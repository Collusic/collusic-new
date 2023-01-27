echo -e "\n\n———— ⛔️ target 폴더 제거 ————\n"
rm -rf target

echo -e "\n\n———— ⛔️ docker container 삭제 ————\n"
docker rm $(docker ps -a -q)

echo -e "\n\n———— ⛔️ docker image 삭제 ————\n"
docker rmi `docker images -a -q`

echo -e "\n\n———— 📦 maven package 파일 생성 ————\n"
gradle build

echo -e "\n\n———— 🐳 docker container 생성 및 실행 ————\n"
docker-compose up
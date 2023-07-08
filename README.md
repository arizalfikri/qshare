# qshare
### tata cara untuk menjalankan aplikasi ini

jalankan aplikasi backend terlebih dahulu dengan cara, sebagai berikut :
1. pastikan laptop atau kompunter sudah terinstall postgreSQL
2. jika sudah terinstall, langkah selanjutnya masuk ke direktori backend
3. setelah masuk ke direktori backend jalankan perintah ```npm run install``` di terminal
4. lalu create database, dengan cara jalankan perintah ```npx sequelize-cli db:create``` di terminal
5. pastikan database sudah berhasil dibuat
6. lalu jalankan perintah ```npx sequelize-cli db:migrate```
7. langkah terakhir, jalankan perintah ```npx nodemon index.js``` untuk menjalankan aplikasi backend

langkah selanjutnya yaitu menjalankan aplikasi frontend dengan cara, sebagai berikut :
1. masuk ke direktori frontend
2. setelah masuk ke direktori frontend jalankan perintah ```npm run install``
3. langkah terakhir, jalankan perintah ```npm run dev``` untuk menjalankan aplikasi frontend di mode development

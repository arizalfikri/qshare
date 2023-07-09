# qshare
### tata cara untuk menjalankan aplikasi ini

jalankan aplikasi backend terlebih dahulu dengan cara, sebagai berikut :
1. pastikan sudah menginstall postgreSQL
2. masuk ke direktori backend
3. setelah masuk ke direktori backend jalankan perintah ```npm run install``` di terminal 
4. atur terlebih dahulu konektifitas backend dengan postgreSQL
5. masuk ke folder config, kemudian config.json
6. atur nama database, username, password, host dan dialectnya
7. jika sudah yakin benar akses ke postgreSQL, create database dengan cara jalankan perintah ```npx sequelize-cli db:create``` di terminal
8. pastikan database sudah berhasil dibuat
9. lalu jalankan perintah ```npx sequelize-cli db:migrate```
10. langkah terakhir, jalankan perintah ```npx nodemon index.js``` untuk menjalankan backend

langkah selanjutnya yaitu menjalankan frontend dengan cara, sebagai berikut :
1. masuk ke direktori frontend
2. setelah masuk ke direktori frontend jalankan perintah ```npm run install``
3. langkah terakhir, jalankan perintah ```npm run dev``` untuk menjalankan frontend di mode development

- `docker container run <img-name>`
  - uygulama çalışır sonrasında durdurulur.
  ***
- `docker container run -d <img-name>`
  - çalışmaya devam eder
  ***
- `docker logs -- <cont-name>`
  ***
- `docker container stop <cont-name>`
  ***
- `docker container start <cont-name>`
  - detach çalışanlar için.
  ***
- `docker container rm <cont-name>`
  ***
- `docker container run -d -p 80:80 <img-name>`
  ***
- `docker container exec -it <cont-name> sh`
  - exec ile bağlanılıyor
  - it ile terminal açıyor
  - sh shell açmasını sağlıyor.
  ***
- `docker container run <img-name> ls`
  - ls komutuyla birlikte containerı oluşturur.
  ***
- `docker create volume <vol-name>`
  ***
- `docker container run --name <cont-name> -it -v <vol-name>:/<folder-name> <img-name>`
  - isimli bir container yaratır ve interact için bir terminal oluşturur.
  - container'ı -v ile volume/folder'a bağlar.
  - bağlandığımız terminalde `cd <folder-name>` ile volume'de işlem yapabiliriz.
  - burada yaptığımız işlem (açtığımız dosya vs.) kalıcı olacaktır.
  ***
- `-v <vol-name>:/<folder-name>:ro` yaparsak ro -> read-only demek olacağı için volume'de işlem yapamayız, sadece okuyabiliriz.
  ***
- Ayrıca genellikle localde kullanılan bind mount örneği olarak `docker container run -d --name webserver1 -p 80:80 -v C:\deneme:/usr/local/apache2/htdocs ozgurozturknet/adanzyedocker`
  - C içindeki deneme klasörü 80 portunda ayağa kalkıyor. Dosya değiştikçe porttaki içerik de değişiyor.
  ***

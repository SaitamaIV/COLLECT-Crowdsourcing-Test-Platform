sudo rm -f /var/www/html/index.html
sudo rm -f -r /var/www/html/static


sudo cp -f dist/index.html /var/www/html/
sudo cp -f -r dist/static /var/www/html/


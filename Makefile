# Makefile for generating modern icon set from icons/logo.png (PNG only, no favicon.ico, IMv7+)

SRC = icons/logo.png

all: icons/cloudnative_256.png icons/cloudnative_32.png

# 生成 cloudnative_256.png
icons/cloudnative_256.png: $(SRC)
	magick $(SRC) -resize 256x256 $@

# 生成 cloudnative_32.png（增强版，避免透明后看不到）
icons/cloudnative_32.png: $(SRC)
	magick $(SRC) -resize 24x24 -background "#667eea" -gravity center -extent 32x32 $@

run:
	python3 -m http.server 8080

clean:
	rm -f icons/cloudnative_*.png

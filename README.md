# camera-media-extractor

[![Build Status](https://travis-ci.org/sandman21dan/camera-media-extractor.svg?branch=master)](https://travis-ci.org/sandman21dan/camera-media-extractor)

A node based command line tool to extract photos and videos
from your camera and mobile phone, and tidy them up into tidy
dated folders

## Why?

The reason I built this piece of software is due to Google
killing Picasa, which was a picture managing program

I really liked picasa specifically for the import feature that it had
where if you attached a volume to your PC it would prompt you to import
the images and videos from it, and it would automatically sort them
into folders based on the dates of the pictures

Having lost the ability to do that, and any picture management program
I found out there are simply way to bloated when I just want to automatically
extract photos and videos from my devices

## How does it work?

It scans all the pictures and videos (you can choose the file extensions)
in your source folder, and it will create folders based on the [Exif](https://en.wikipedia.org/wiki/Exif)
date of your file (or creation time if Exif is not available)
and copy only new images and videos on to those folders

The file comparison is only based on file name at this time

Note: this will not delete any files from your source memory

## How to use

In a nutshell:

1. Clone this repo

2. Run the following on the console:
```sh
npm i && npm run build && npm link
```

3. To extract files let's say from a memory card located in `/mnt/f/`
to your pictures folder located in `/home/daniel/Pictures`

You would run the following:
```sh
camera-media-extractor /mnt/f/ /home/daniel/Pictures
```
and let the magic happen

You can do a dry run if you only want to check which files would be copied
```sh
camera-media-extractor --dry-run /mnt/f/ /home/daniel/Pictures
```

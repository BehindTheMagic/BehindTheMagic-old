# Star Wars: Behind The Magic 
https://BehindTheMagic.github.io/

## OK:
- asset loader (appcache) and cache.manifest generator (PHP)
- init (rendering views, modals)
- videoPlayer (with escape and space keyboard events)
- view switcher (based on hash)
- all video files converted into mp4 (x264/aac)
- all audio files converted into mp3
- all video, audio, JPGs files stored in the assets/ folder, with the hierarchy of the CD bundles
- favicon and font :)

## Views and modals ready:
- mainMenu (styles, buttons, mainMenu video)

## What's wrong:
- huge assets folder (over 500MB), need to compress
- view switcher doesn't map all characters/weapons to a single view yet
    (/characters/main/LUKE/ should point to the view introduction with LUKE data)
- Chrome for Android can't play() video until a user gesture (explicit play from user) [Flag available]

## Coming:
- Creating and stylizing all the views (THE BIG PART OF THE PROJECT)
- converting DATABASE textual content into a json database file
- some important sounds and images files, but I'll need some help to convert them (.SAD and .BM files respectively)
- This section has to be updated with all missing tasks

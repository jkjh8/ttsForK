import sys
import json
import pyttsx3


def make_file(command):
    try:
        engine = pyttsx3.init()
        text = command[1]
        filepath = command[2]
        filename = command[3]
        rate = command[4]
        voice = command[5]

        # make file path name
        mp3filename = filepath + '/' + filename + '.mp3'

        # set engine properties
        engine.setProperty('rate', int(rate))
        engine.setProperty('voice', voice)

        # create audio file
        engine.save_to_file(text, mp3filename)
        print(json.dumps({"error": None, "file": mp3filename,
              "type": "audio", "rate": rate}))

        # end process
        sys.exit()
    except Exception as e:
        print(json.dumps({"error": e}))
        sys.exit()


def get_info():
    try:
        engine = pyttsx3.init()

        # get engine properties
        voices = engine.getProperty('voices')
        voice = engine.getProperty('voice')
        rate = engine.getProperty('rate')
        pythonPath = sys.executable
        print(json.dumps({"error": None, "voices": voices, "voice": voice,
              "rate": rate, "pythonPath": pythonPath}, default=lambda x: x.__dict__))

        # end process
        sys.exit()
    except Exception as e:
        print(json.dumps(e))
        sys.exit()


if __name__ == "__main__":
    command = sys.argv
    if command[1] == "make_file":
        command.pop()
        make_file(command)
    elif command[1] == "get_info":
        get_info()
    else:
        print(json.dumps({"error": "unknown command"}))
        sys.exit()

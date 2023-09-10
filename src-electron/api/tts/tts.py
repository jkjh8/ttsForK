import sys
import json
import pyttsx3


def make_file(command):
    try:
        engine = pyttsx3.init()

        # set engine properties
        engine.setProperty('rate', int(command["rate"]))
        engine.setProperty('voice', command["voice"])

        # create audio file
        engine.save_to_file(command["message"], command["filename"])
        engine.runAndWait()
        print(json.dumps({"error": None, "file": command["filename"],
              "type": "audio/wav", "rate": command["rate"], "voice": command["voice"]}))

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
    args = sys.argv[1]
    kwargs = json.loads(args)
    if kwargs["comm"] == "make_file":
        make_file(kwargs)
    elif kwargs["comm"] == "get_info":
        get_info()
    else:
        print(json.dumps({"error": "unknown command"}))
        sys.exit()

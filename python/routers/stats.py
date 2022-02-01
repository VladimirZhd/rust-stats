from fastapi import APIRouter
import json
import requests

router = APIRouter()

f = open("config.json")
config = json.load(f)

STEAM_KEY = config["STEAM_KEY"]
STATS_URL = config["STATS_URL"]
APP_ID = config["APP_ID"]


@router.get("", tags=["stats"], status_code=200)
async def get_game_stats(steam_id):
    """Get statistics for 'Rust' video game for one user.

    Args:
        steam_id (str): Steam user id.
    """
    formatted_data = {}
    res = requests.get(
        "{}?key={}&steamid={}&appid={}".format(STATS_URL, STEAM_KEY, steam_id, APP_ID)
    )
    if res.status_code == 200:
        data = res.json()["playerstats"]
        for el in data["stats"]:
            formatted_data[el["name"]] = el["value"]
        return formatted_data
    else:
        return {"message": "There was an error, please check SteamId and try again"}

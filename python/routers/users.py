from fastapi import APIRouter
import json
import requests

router = APIRouter()

f = open("config.json")
config = json.load(f)

STEAM_KEY = config["STEAM_KEY"]
VANITY_URL = config["VANITY_URL"]
USER_SUMMARIES = config["USER_SUMMARIES"]


@router.get("/getSteamId", tags=["users"], status_code=200)
async def get_steam_id(vanity_id):
    """Get numerical Steam id if user provides vanity id.

    Args:
        vanity_id (str): A custom id users setup through steam.

    Returns:
        Dict: A numerical id returned from steam api.
    """
    res = requests.get(
        "{}?key={}&vanityUrl={}".format(VANITY_URL, STEAM_KEY, vanity_id)
    )
    data = res.json()
    if "steamid" in data["response"]:
        id_ = data["response"]["steamid"]
        return {"steamId": id_}
    else:
        return {"message": "{}".format(data["response"]["message"])}


@router.get("/getSummaries", tags=["users"], status_code=200)
async def get_user_summaries(steam_id):
    """Get users basic info and avatar.

    Args:
        steam_id (str): Steam id for a user.

    Returns:
        Dict: A dictionary with user information stored by steam.
    """
    res = requests.get(
        "{}?key={}&steamids={}".format(USER_SUMMARIES, STEAM_KEY, steam_id)
    )
    data = res.json()
    if data["response"]["players"]:
        player = data["response"]["players"][0]
        return player
    else:
        return {"message": "There was an error fetching a player"}

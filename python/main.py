from fastapi import FastAPI
from routers import users, stats
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Import routes
app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(stats.router, prefix="/stats", tags=["stats"])

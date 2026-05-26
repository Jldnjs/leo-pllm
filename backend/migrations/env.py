import sys
from os.path import abspath, dirname
from alembic import context
from sqlalchemy import engine_from_config, pool

# 📍 [필수] Alembic이 최상위 app 폴더를 인식할 수 있도록 경로를 주입합니다.
sys.path.insert(0, dirname(dirname(abspath(__file__))))

# 📍 [필수] 우리가 만든 Base와 Model들을 임포트합니다.
from app.core.database import Base
from app.models import user_model  # 👈 여기에 새로 만드는 모델들을 계속 추가해주면 됩니다.

config = context.config

# 📍 [필수] 자동으로 테이블 변경을 감지할 수 있도록 target_metadata를 설정합니다.
target_metadata = Base.metadata


def run_migrations_offline() -> None:
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection, target_metadata=target_metadata
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
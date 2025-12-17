FROM mysql:8.0

# MySQL Docker Container for Render Deployment
# Note: Render's free tier recommends PostgreSQL. This Dockerfile is for MySQL deployment.
# For PostgreSQL deployment, convert schema.sql and seed.sql to PostgreSQL syntax.
# See DEPLOYMENT.md for detailed instructions.

# Set environment variables with defaults
# These can be overridden when running the container
ENV MYSQL_DATABASE=${MYSQL_DATABASE:-hr_database}
ENV MYSQL_ROOT_HOST=%

# Copy initialization scripts
COPY schema.sql /docker-entrypoint-initdb.d/01-schema.sql
COPY seed.sql /docker-entrypoint-initdb.d/02-seed.sql

# Expose MySQL port
EXPOSE 3306

# Use default MySQL entrypoint
CMD ["mysqld"]

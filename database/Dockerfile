FROM mysql:8.0

# Set environment variables
ENV MYSQL_DATABASE=hr_database
ENV MYSQL_ROOT_HOST=%

# Copy initialization scripts
COPY schema.sql /docker-entrypoint-initdb.d/01-schema.sql
COPY seed.sql /docker-entrypoint-initdb.d/02-seed.sql

# Expose MySQL port
EXPOSE 3306

# Use default MySQL entrypoint
CMD ["mysqld"]

#!/bin/sh
set -e

echo "=== Injecting runtime environment variables ==="

# Create the environment variables object
ENV_JS="window._env_ = {"

# Get all environment variables that start with REACT_APP_
for var in $(env | grep "^REACT_APP_" | cut -d= -f1); do
    value=$(eval echo \$$var)
    # Escape quotes and backslashes in the value
    escaped_value=$(echo "$value" | sed 's/\\/\\\\/g' | sed 's/"/\\"/g')
    ENV_JS="$ENV_JS\"$var\":\"$escaped_value\","
done

# Remove trailing comma and close the object
ENV_JS=$(echo "$ENV_JS" | sed 's/,$//')
ENV_JS="$ENV_JS};"

echo "Environment variables to inject: $ENV_JS"

# Find the main HTML file
HTML_FILE="/usr/share/nginx/html/index.html"

if [ -f "$HTML_FILE" ]; then
    echo "Injecting environment variables into $HTML_FILE"

    # Create a temporary file with the environment injection
    TEMP_FILE=$(mktemp)

    # Insert the environment variables script into the <head> section
    sed "/<head>/a\\
<script>$ENV_JS</script>" "$HTML_FILE" > "$TEMP_FILE"

    # Preserve original file permissions and ownership
    PERMS=$(stat -c "%a" "$HTML_FILE")
    chmod "$PERMS" "$TEMP_FILE"
    OWNER=$(stat -c "%u:%g" "$HTML_FILE")
    chown "$OWNER" "$TEMP_FILE" 2>/dev/null || true

    # Replace the original file
    mv "$TEMP_FILE" "$HTML_FILE"

    echo "Successfully injected environment variables"
else
    echo "Warning: $HTML_FILE not found. Environment variables not injected."
fi

echo "=== Environment injection complete ==="

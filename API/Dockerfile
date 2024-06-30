FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app
EXPOSE 8080

# copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore

# copy everything else and build
COPY . ./
# -c (config) -o (output dic)
RUN dotnet publish -c Release -o out

# build a runtime image, don't need compiler from sdk so the runtime is much smaller
FROM mcr.microsoft.com/dotnet/aspnet:8.0-bookworm-slim-amd64 AS runtime
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT [ "dotnet", "API.dll" ]

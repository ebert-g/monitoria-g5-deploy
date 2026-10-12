FROM eclipse-temurin:25-jdk AS build
WORKDIR /app

COPY .mvn .mvn
COPY mvnw pom.xml ./
RUN sh ./mvnw -B -q dependency:go-offline

COPY src src
RUN sh ./mvnw -B -q -DskipTests package

FROM eclipse-temurin:25-jre
WORKDIR /app

RUN useradd --system --no-create-home --shell /usr/sbin/nologin app
COPY --from=build /app/target/*.jar app.jar

USER app
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

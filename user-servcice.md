# 🧩 Auth & User Service — Specification

## 🏷️ Overview
The Auth & User Service manages authentication, authorization, and user identity within the video conferencing ecosystem.
It issues and validates tokens, stores user profiles, manages roles and permissions, and ensures secure interaction between services.

## 🚀 Core Responsibilities

   - User registration and profile management

   - Authentication (login, logout, refresh)

   - Authorization (role-based & resource-based)

   - Token management (JWT & refresh tokens)

   - Session tracking (active sessions, device limits)

   - Password and credential management

   - OAuth2 / SSO support (Google, GitHub, etc.)

   - Email & phone verification

   - Two-factor authentication (2FA)

   - User activity logging and audit trail

## 🧱 Data Model
    - User

    | Field              | Type            | Description                       |
    | ------------------ | --------------- | --------------------------------- |
    | id                 | UUID            | Unique user identifier            |
    | email              | String          | Primary email address             |
    | username           | String          | Display name                      |
    | password           | String (hashed) | Secure password hash              |
    | roles              | Array<String>   | User roles (e.g. `user`, `admin`) |
    | avatar_url         | String          | Optional profile image            |
    | is_verified        | Boolean         | Email verification status         |
    | two_factor_enabled | Boolean         | 2FA activation status             |
    | created_at         | Date            | Registration date                 |
    | updated_at         | Date            | Last profile update               |


## 🔐 Authentication Flow

    1️⃣ Registration

       - User signs up with email, username, and password

       - Password is hashed using Argon2 or bcrypt

       - Verification email or OTP is sent

       - Once verified, user record is marked as is_verified: true

    2️⃣ Login

       - User logs in with email/password or OAuth2 provider

       - JWT access and refresh tokens are issued

       - Refresh token stored securely (Redis or database)

    3️⃣ Refresh Token

       - Access token expires → new token pair generated

       - Supports token revocation (e.g., logout or suspicious activity)

    4️⃣ 2FA (Optional)

       - TOTP or SMS-based 2FA for added security

       - Configurable per user in settings

## ⚙️ API Endpoints
    - Auth

        | Method | Endpoint                | Description                        |
        | ------ | ----------------------- | ---------------------------------- |
        | `POST` | `/auth/register`        | Create a new user                  |
        | `POST` | `/auth/login`           | Authenticate user and issue tokens |
        | `POST` | `/auth/refresh`         | Refresh access token               |
        | `POST` | `/auth/logout`          | Invalidate refresh token           |
        | `POST` | `/auth/verify-email`    | Verify email via token             |
        | `POST` | `/auth/forgot-password` | Send password reset email          |
        | `POST` | `/auth/reset-password`  | Reset user password                |
        | `POST` | `/auth/2fa/setup`       | Enable or disable 2FA              |
        | `POST` | `/auth/2fa/verify`      | Verify TOTP or SMS code            |

    - User
        | Method   | Endpoint     | Description                            |
        | -------- | ------------ | -------------------------------------- |
        | `GET`    | `/users/me`  | Get current user profile               |
        | `PATCH`  | `/users/me`  | Update profile                         |
        | `GET`    | `/users/:id` | Get user by ID (admin only)            |
        | `GET`    | `/users`     | List all users (paginated, admin only) |
        | `DELETE` | `/users/:id` | Delete user (admin only)               |

## 🧠 Features in Depth

   ### 🔑 JWT Management

    - Short-lived access tokens (15m)

    - Long-lived refresh tokens (7d)

    - Token rotation for enhanced security

    - Blacklist and revocation via Redis

   ### 🧭 Role-Based Access Control (RBAC)

    - Define roles: user, moderator, admin

    - Granular permissions (e.g., can_create_meeting, can_mute_participant)

    - Integration with Gateway middleware for policy enforcement

  ### 🛡️ Security Practices

    - Passwords hashed with Argon2id

    - Rate limiting on login/register endpoints

    - CSRF-safe token flow (stateless auth)

    - Brute-force protection

    - Secure cookie or header-based storage

 ### 📧 Email & Notification Integration

    - Send verification, welcome, and reset emails via Notification Service

    - Decoupled via message queue (RabbitMQ / Kafka)

 ### 🔍 Monitoring & Auditing

    - Log every login/logout, failed attempt, and password reset

    - Store device fingerprints and IPs

    - Integrate with Analytics Service for behavioral analysis

## 🧩 Integration with Other Services

    | Service                  | Purpose                                |
    | ------------------------ | -------------------------------------- |
    | **Gateway Service**      | Verifies JWTs on incoming requests     |
    | **Meeting Service**      | Authenticates hosts/participants       |
    | **Chat Service**         | Identifies message senders             |
    | **Notification Service** | Sends emails, OTPs, and alerts         |
    | **Analytics Service**    | Tracks authentication and user metrics |

## 🧰 Tech Stack

    - Language: TypeScript

    - Framework: NestJS / Fastify

    - Database: PostgreSQL (primary)

    - Cache: Redis (sessions & tokens)

    - Message Queue: RabbitMQ or Kafka

    - Auth Protocols: JWT, OAuth2, TOTP

    - Testing: Vitest + Supertest

    - Deployment: Docker + Kubernetes

## 🚧 Future Enhancements

    - WebAuthn (passwordless login)

    - Device-based session management

    - Adaptive MFA (risk-based 2FA)

    - Integration with external IAM systems (Okta, Auth0)

    - Account recovery via trusted device

# 🧱 High-Level Architecture Diagram

                    ┌───────────────────────────-┐
                    │       API Gateway          │
                    │ (Verifies JWT via Auth)    │
                    └──────────-┬────────────────┘
                                │
                                ▼
                    ┌───────────────────────────┐
                    │    Auth & User Service    │
                    │───────────────────────────│
                    │ - Auth Controller         │
                    │ - User Controller         │
                    │ - Auth Service Layer      │
                    │ - User Service Layer      │
                    │ - Token Service           │
                    │ - Role/Permission Module  │
                    │ - 2FA Module              │
                    │ - Email Verification      │
                    │ - Audit Logger            │
                    └──────────--┬──────────────┘
                ┌────────────────┼─────────────────────┐
                ▼                ▼                     ▼
        ┌──────────────┐   ┌───────────────-┐    ┌────────────────┐
        │ PostgreSQL   │   │ Redis Cache    │    │ Message Broker │
        │ (Users, Roles│   │ (Tokens, OTPs) │    │ (RabbitMQ/Kafka│
        │  Sessions)   │   │                │    │  Notifications)│
        └──────────────┘   └───────────────-┘    └────────────────┘
                │
                ▼
        ┌───────────────────────────────---┐
        │ External Dependencies            │
        │  - Notification Service (emails) │
        │  - Analytics Service (logs)      │
        └───────────────────────────────---┘


# Relation with Notification System
          ┌─────────────────────┐
          │     Auth Service    │
          │ (HTTP + Publisher)  │
          └─────────────────────┘
                    │
                    │ emits event
                    ▼
       ┌─────────────────────────────┐
       │        RabbitMQ Broker      │
       │  (Exchange: user_events)    │
       │  (Queue: notification_queue)│
       └─────────────────────────────┘
                    │
                    │ consumes
                    ▼
        ┌─────────────────────────┐
        │ Notification Service    │
        │ (Consumer + Email Send) │
        └─────────────────────────┘

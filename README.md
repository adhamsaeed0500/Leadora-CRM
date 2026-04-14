<div align="center">
  <h1>🏢 Leadora CRM</h1>
  <p><strong>Real Estate Sales Operating System</strong></p>
  <p><em>Built with Next.js, NestJS, and PostgreSQL</em></p>
</div>

<br />

## 🎯 1. Product Overview

A SaaS CRM system designed for real estate companies to:
- Manage leads efficiently
- Track sales pipeline
- Handle WhatsApp communication
- Store files and documents
- Manage property inventory
- Handle bookings and payments

---

## 👥 2. User Roles

- **Admin**: Full system access, manage users and global settings.
- **Sales Manager**: Monitor team performance, view analytics and reporting.
- **Sales Agent**: Manage leads, handle conversations, update deals.

---

## 🧠 3. Core Concept

The system flows through a linear progression designed to maximize conversions:

```text
Lead → Conversation → Deal → Unit → Booking → Payment
```

---

## 🧱 4. System Modules

### 4.1 CRM Module
- Leads management
- Activities (calls, notes, meetings)
- Tasks & reminders
- Sales pipeline (Kanban)

### 4.2 Messaging Module (WhatsApp Integration)
- Real-time chat per lead
- Incoming/outgoing messages
- Message tracking

### 4.3 File Management Module
- Upload images, PDFs, contracts
- Attach files to leads/deals/units (via AWS S3)

### 4.4 Inventory Module
- Projects
- Units
- Availability tracking

### 4.5 Booking Module
- Reserve units for leads
- Booking expiration logic

### 4.6 Payments Module
- Installments
- Payment tracking
- Payment status

---

## 🔄 5. Business Flows

### 5.1 Lead Flow
1. Lead created
2. Assigned to sales
3. Follow-up activities created
4. Converted to deal

### 5.2 WhatsApp Flow
1. Customer sends message
2. Webhook triggers NestJS
3. System finds or creates Lead
4. Message stored in DB
5. Shown in CRM UI

### 5.3 Booking Flow
1. Deal selects unit
2. Booking created
3. Unit becomes reserved
4. Payment confirms booking
5. Unit becomes sold

---

## ⚙️ 6. System Architecture

- **Frontend**: Next.js (App Router), Chat UI + Dashboard
- **Backend**: NestJS (Modular Monolith), REST APIs + Webhooks
- **Database**: PostgreSQL with Prisma ORM
- **Realtime**: WebSockets (for chat updates)
- **External Services**: 
  - WhatsApp Business API
  - AWS S3 (file storage)
- **Deployment**: Docker

---

## 🔐 7. Business Rules

- **Unit Protection**: A unit cannot be sold twice. Status flows: `available → reserved → sold`.
- **Follow-up Rule**: Every lead must have a next activity.
- **Booking Expiration**: If not confirmed, booking auto-cancels.
- **Message Tracking**: All WhatsApp messages must be stored securely.

---

## 🚀 8. Development Phases

- **Phase 1 (MVP - CRM Core)**: Leads management, activities & tasks, pipeline (deals), basic dashboard.
- **Phase 2 (Inventory)**: Projects, units, deal → unit assignment.
- **Phase 3 (Booking + Payments)**: Booking system, installments, payment tracking.
- **Phase 4 (Messaging + Files)**: WhatsApp integration, conversations & messages, file uploads (S3).
- **Phase 5 (Advanced)**: AI assistant, automation rules, analytics dashboard.

---

## 📈 9. Key Product Insight

This system is not just a CRM. It is a **Real Estate Sales Operating System**.
It seamlessly connects Leads, Communication, Inventory, and Payments into one unified workflow.

---

## 🎯 10. MVP Success Metric

> **Success = No lead is lost + faster deal closing**

---

## 💻 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Docker (optional)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd leadora-crm
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration (Postgres, S3, WhatsApp API credentials)
   ```

4. **Run the application:**
   ```bash
   # Development server
   npm run start:dev
   ```

### Testing
```bash
npm run test        # Unit tests
npm run test:e2e    # End-to-end tests
```

### Docker Deployment
```bash
docker-compose up --build
```

---

## 🤝 Support & Contributing

- **Contributing**: Contributions are welcome! Please submit a Pull Request.
- **License**: Licensed under the MIT License - see the `LICENSE` file for details.
- **Contact**: For inquiries, please reach out to the development team.

# Hospital Backend API Plan

## Authentication
- `POST /auth/signup` - Registers a new user account.
- `POST /auth/login` - Authenticates a user and issues access credentials.

## Patient
- `GET /patients/profile` - Retrieves the logged-in patient’s profile.
- `PATCH /patients/profile` - Updates the patient’s profile information.
- `GET /appointments/mine` - Lists appointments belonging to the patient.
- `POST /appointments` - Creates a new appointment request.
- `PATCH /appointments/:id/cancel` - Cancels a specific appointment.
- `GET /medical-history/mine` - Retrieves the patient’s personal medical history.
- `GET /invoices/mine` - Lists invoices issued to the patient.
- `GET /notifications` - Lists notifications for the logged-in patient.
- `PATCH /notifications/:id/read` - Marks one notification as read.
- `PATCH /notifications/read-all` - Marks all notifications as read.

## Doctor
- `GET /doctors` - Lists all doctors.
- `GET /doctors/:id` - Retrieves a doctor’s public profile.
- `GET /doctors/profile` - Retrieves the logged-in doctor’s profile.
- `PATCH /doctors/profile` - Updates the doctor’s profile.
- `GET /schedules/me` - Retrieves the logged-in doctor’s schedule.
- `PUT /schedules/me` - Creates or replaces the doctor’s schedule.
- `GET /schedules/doctors/:doctorId/available?date=YYYY-MM-DD` - Finds available appointment times for a doctor on a date.
- `GET /appointments/doctor` - Lists appointments assigned to the doctor.
- `PATCH /appointments/:id/status` - Changes an appointment status, such as confirmed or completed.
- `GET /medical-history/patient/:patientId` - Retrieves a specific patient’s medical history.
- `POST /medical-history` - Adds a medical-record entry for a patient.
- `GET /notifications` - Lists notifications for the logged-in doctor.
- `PATCH /notifications/:id/read` - Marks one doctor notification as read.
- `PATCH /notifications/read-all` - Marks all doctor notifications as read.

## Receptionist / Admin
- `GET /appointments` - Lists hospital appointments for receptionist or admin management.
- `PATCH /appointments/:id/status` - Updates an appointment’s status.
- `GET /invoices` - Lists invoices managed by the hospital.
- `PATCH /invoices/:id/pay` - Records an invoice as paid.
- `GET /admin/dashboard` - Provides administrator statistics and dashboard data. This endpoint is admin-only.

## Shared
- `GET /departments` - Lists all hospital departments.
- `GET /departments/:id` - Retrieves a specific department’s details.
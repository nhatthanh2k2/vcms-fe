
export const getPatientInfo = (record) => {
    const customerFullName = record.orderCustomerFullName || record.appointmentCustomerFullName || ''
    const customerPhone = record.orderCustomerPhone || record.appointmentCustomerPhone || ''
    const customerDob = record.orderCustomerDob || record.appointmentCustomerDob || ''

    const patientInfo = {
        customerFullName,
        customerPhone,
        customerDob
    }

    return patientInfo
  }
  
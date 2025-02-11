import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, ScrollView, StyleSheet } from 'react-native';

const BloodDonorForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    bloodGroup: '',
    lastDonationDate: '',
    mobile: '',
    policeStation: '',
    address: '',
    comments: ''
  });

  const [showBloodGroup, setShowBloodGroup] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateParts, setDateParts] = useState({ day: null, month: null, year: null });

  // Data arrays
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  // Date validation functions
  const isLeapYear = (year) => (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
  const getDaysInMonth = (monthIndex, year) => {
    if (monthIndex === 1) return isLeapYear(year) ? 29 : 28;
    return new Date(year, monthIndex + 1, 0).getDate();
  };

  // Date handling
  const handleDateSelection = () => {
    if (dateParts.day && dateParts.month !== null && dateParts.year) {
      const monthIndex = months.indexOf(dateParts.month);
      const maxDays = getDaysInMonth(monthIndex, dateParts.year);
      const day = Math.min(dateParts.day, maxDays);

      const formattedDate = `${day.toString().padStart(2, '0')}-${(monthIndex + 1).toString().padStart(2, '0')}-${dateParts.year}`;

      setFormData(prev => ({ ...prev, lastDonationDate: formattedDate }));
      setShowDatePicker(false);
    }
  };

  useEffect(() => {
    if (showDatePicker) {
      const currentDate = formData.lastDonationDate.split('-') || [];
      setDateParts({
        day: currentDate[0] ? parseInt(currentDate[0]) : null,
        month: currentDate[1] ? months[parseInt(currentDate[1]) - 1] : null,
        year: currentDate[2] ? parseInt(currentDate[2]) : currentYear
      });
    }
  }, [showDatePicker]);

  // Form handling
  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log('Form Data:', formData);
    // Add your submission logic here
  };

  // Reusable components
  const DateColumn = ({ items, selected, onSelect, style }) => (
    <ScrollView style={[styles.dateColumn, style]}>
      {items.map(item => (
        <TouchableOpacity
          key={item}
          style={[
            styles.dateItem,
            selected === item && styles.selectedDateItem
          ]}
          onPress={() => onSelect(item)}
        >
          <Text style={[
            styles.dateText,
            selected === item && styles.selectedDateText
          ]}>
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/*User name*/}
      <TextInput
        style={styles.input}
        placeholder="your Name"
        placeholderTextColor="#868e96"
        value={formData.name}
        onChangeText={text => handleInputChange('name', text)}
      />
      {/* Blood Group Selector */}
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowBloodGroup(true)}
      >
        <Text style={formData.bloodGroup ? styles.inputText : styles.placeholder}>
          {formData.bloodGroup || 'Select Blood Group'}
        </Text>
      </TouchableOpacity>

      {/* Date Selector */}
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={formData.lastDonationDate ? styles.inputText : styles.placeholder}>
          {formData.lastDonationDate || 'Select Last Donation Date'}
        </Text>
      </TouchableOpacity>

      {/* Mobile Number */}
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        placeholderTextColor="#868e96"
        keyboardType="phone-pad"
        value={formData.mobile}
        onChangeText={text => handleInputChange('mobile', text)}
      />


      {/* Police Station */}
      <TextInput
        style={styles.input}
        placeholder="Police Station"
        placeholderTextColor="#868e96"
        value={formData.policeStation}
        onChangeText={text => handleInputChange('policeStation', text)}
      />

      {/* Address */}
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Address"
        placeholderTextColor="#868e96"
        multiline
        value={formData.address}
        onChangeText={text => handleInputChange('address', text)}
      />

      {/* Comments */}
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Comments"
        placeholderTextColor="#868e96"
        multiline
        value={formData.comments}
        onChangeText={text => handleInputChange('comments', text)}
      />

      {/* Submit Button */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
      >
        <Text style={styles.submitText}>Submit Details</Text>
      </TouchableOpacity>

      {/* Blood Group Modal */}
      <Modal visible={showBloodGroup} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Blood Type</Text>
            {bloodGroups.map(group => (
              <TouchableOpacity
                key={group}
                style={styles.modalItem}
                onPress={() => {
                  handleInputChange('bloodGroup', group);
                  setShowBloodGroup(false);
                }}
              >
                <Text style={styles.modalText}>{group}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Date Picker Modal */}
      <Modal visible={showDatePicker} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Donation Date</Text>
            <View style={styles.dateContainer}>
              <DateColumn
                items={Array.from({ length: 31 }, (_, i) => i + 1)}
                selected={dateParts.day}
                onSelect={day => setDateParts(p => ({ ...p, day }))}
              />
              <DateColumn
                items={months}
                selected={dateParts.month}
                onSelect={month => {
                  const monthIndex = months.indexOf(month);
                  const maxDays = getDaysInMonth(monthIndex, dateParts.year || currentYear);
                  setDateParts(p => ({
                    ...p,
                    month,
                    day: Math.min(p.day || 31, maxDays)
                  }));
                }}
              />
              <DateColumn
                items={years}
                selected={dateParts.year}
                onSelect={year => {
                  const monthIndex = months.indexOf(dateParts.month || 'Jan');
                  const maxDays = getDaysInMonth(monthIndex, year);
                  setDateParts(p => ({
                    ...p,
                    year,
                    day: Math.min(p.day || 31, maxDays)
                  }));
                }}
              />
            </View>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleDateSelection}
            >
              <Text style={styles.confirmButtonText}>Confirm Date</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  inputText: {
    fontSize: 16,
    color: '#212529',
  },
  placeholder: {
    fontSize: 16,
    color: '#868e96',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
    color: '#212529',
  },
  modalItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
  },
  modalText: {
    fontSize: 16,
    color: '#212529',
  },
  dateContainer: {
    flexDirection: 'row',
    height: 300,
  },
  dateColumn: {
    flex: 1,
  },
  dateItem: {
    padding: 12,
    alignItems: 'center',
  },
  selectedDateItem: {
    backgroundColor: '#e63946',
    borderRadius: 6,
  },
  dateText: {
    fontSize: 16,
    color: '#495057',
  },
  selectedDateText: {
    color: 'white',
  },
  confirmButton: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#dee2e6',
    alignItems: 'center',
    backgroundColor: '#e63946',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#e63946',
    borderRadius: 8,
    padding: 18,
    marginTop: 20,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  submitText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BloodDonorForm;
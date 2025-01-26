import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { showNotification } from "../../common/headerSlice";
import InputText from "../../../components/Input/InputText";
import TextAreaInput from "../../../components/Input/TextAreaInput";
import TitleCard from "../../../components/Cards/TitleCard";

function EditProfile() {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        personalInfo: {
            mobileNumber: '',
            firstName: '',
            lastName: '',
            profession: '',
            emailId: '',
            password: '',
            confirmPassword: '',
        },
        businessInfo: {
            companyName: '',
            designation: '',
            businessType: '',
            businessMobileNo: '',
            website: '',
        },
        location: {
            country: '',
            state: '',
            city: '',
            address: '',
        },
        documents: {
            aadharCard: null,
            gstin: '',
            profileImage: null,
            visitingCard: null,
        }
    });

    const [loading, setLoading] = useState(false);

    // Fetch existing profile data when component mounts
    useEffect(() => {
        // Simulating an API call to fetch profile data
        const fetchProfileData = async () => {
            // Replace with actual API call
            const profileData = {
                personalInfo: {
                    mobileNumber: '9876543210',
                    firstName: 'John',
                    lastName: 'Doe',
                    profession: 'Software Engineer',
                    emailId: 'john.doe@example.com',
                    password: '', // Shouldn't fetch passwords in production
                    confirmPassword: '',
                },
                businessInfo: {
                    companyName: 'Doe Enterprises',
                    designation: 'CEO',
                    businessType: 'IT Services',
                    businessMobileNo: '9876543210',
                    website: 'https://doeenterprises.com',
                },
                location: {
                    country: 'India',
                    state: 'Karnataka',
                    city: 'Bangalore',
                    address: '123, MG Road, Bangalore',
                },
                documents: {
                    aadharCard: null,
                    gstin: '29ABCDE1234F1Z5',
                    profileImage: null,
                    visitingCard: null,
                }
            };

            setFormData(profileData);
        };

        fetchProfileData();
    }, []);

    const updateFormValue = (section, field, value) => {
        setFormData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value,
            },
        }));
    };

    const handleFileChange = (section, field, event) => {
        const file = event.target.files[0];
        if (file) {
            setFormData((prev) => ({
                ...prev,
                [section]: {
                    ...prev[section],
                    [field]: file,
                },
            }));
        }
    };

    const saveProfileChanges = () => {
        // Validation logic here
        dispatch(showNotification({ message: "Profile Updated Successfully", status: 1 }));
    };

    const renderPersonalInfoFields = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputText
                labelTitle="First Name"
                defaultValue={formData.personalInfo.firstName}
                updateFormValue={(value) => updateFormValue('personalInfo', 'firstName', value)}
            />
            <InputText
                labelTitle="Last Name"
                defaultValue={formData.personalInfo.lastName}
                updateFormValue={(value) => updateFormValue('personalInfo', 'lastName', value)}
            />
            <InputText
                labelTitle="Mobile Number"
                type="tel"
                defaultValue={formData.personalInfo.mobileNumber}
                updateFormValue={(value) => updateFormValue('personalInfo', 'mobileNumber', value)}
            />
            <InputText
                labelTitle="Profession"
                defaultValue={formData.personalInfo.profession}
                updateFormValue={(value) => updateFormValue('personalInfo', 'profession', value)}
            />
            <InputText
                labelTitle="Email ID"
                type="email"
                defaultValue={formData.personalInfo.emailId}
                updateFormValue={(value) => updateFormValue('personalInfo', 'emailId', value)}
                disabled
            />
        </div>
    );

    const renderBusinessInfoFields = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputText
                labelTitle="Company Name"
                defaultValue={formData.businessInfo.companyName}
                updateFormValue={(value) => updateFormValue('businessInfo', 'companyName', value)}
            />
            <InputText
                labelTitle="Designation"
                defaultValue={formData.businessInfo.designation}
                updateFormValue={(value) => updateFormValue('businessInfo', 'designation', value)}
            />
            <InputText
                labelTitle="Business Type"
                defaultValue={formData.businessInfo.businessType}
                updateFormValue={(value) => updateFormValue('businessInfo', 'businessType', value)}
            />
            <InputText
                labelTitle="Business Mobile No."
                type="tel"
                defaultValue={formData.businessInfo.businessMobileNo}
                updateFormValue={(value) => updateFormValue('businessInfo', 'businessMobileNo', value)}
            />
            <InputText
                labelTitle="Website"
                defaultValue={formData.businessInfo.website}
                updateFormValue={(value) => updateFormValue('businessInfo', 'website', value)}
            />
        </div>
    );

    const renderLocationFields = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputText
                labelTitle="Country"
                defaultValue={formData.location.country}
                updateFormValue={(value) => updateFormValue('location', 'country', value)}
            />
            <InputText
                labelTitle="State"
                defaultValue={formData.location.state}
                updateFormValue={(value) => updateFormValue('location', 'state', value)}
            />
            <InputText
                labelTitle="City"
                defaultValue={formData.location.city}
                updateFormValue={(value) => updateFormValue('location', 'city', value)}
            />
            <TextAreaInput
                labelTitle="Address"
                defaultValue={formData.location.address}
                updateFormValue={(value) => updateFormValue('location', 'address', value)}
            />
        </div>
    );

    const renderDocumentFields = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Aadhar Card Upload</label>
                <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange('documents', 'aadharCard', e)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">GSTIN</label>
                <InputText
                    defaultValue={formData.documents.gstin}
                    updateFormValue={(value) => updateFormValue('documents', 'gstin', value)}
                />
            </div>
        </div>
    );

    return (
        <TitleCard title="Edit Profile" topMargin="mt-2">
            <div className="space-y-8">
                <div>
                    <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
                    {renderPersonalInfoFields()}
                </div>

                <div>
                    <h2 className="text-lg font-semibold mb-4">Business Information</h2>
                    {renderBusinessInfoFields()}
                </div>

                <div>
                    <h2 className="text-lg font-semibold mb-4">Location</h2>
                    {renderLocationFields()}
                </div>

                <div>
                    <h2 className="text-lg font-semibold mb-4">Documents</h2>
                    {renderDocumentFields()}
                </div>

                <div className="flex justify-end">
                    <button
                        className={`btn btn-primary ${loading ? "loading" : ""}`}
                        onClick={() => {
                            setLoading(true);
                            // Simulate API call
                            setTimeout(() => {
                                setLoading(false);
                                saveProfileChanges();
                            }, 1000);
                        }}
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </TitleCard>
    );
}

export default EditProfile;

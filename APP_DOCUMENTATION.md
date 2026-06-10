# PQT & PHT - Nhật Ký Tình Yêu

A beautiful, mobile-first love diary app for Phan Quốc Trưởng and Phạm Huyền Trang.

## Features

### 📖 Home Page (Danh sách ghi chú)
- View all diary entries sorted by date (newest first)
- Each entry shows date, preview text, and thumbnail image (if available)
- Click any entry to view full details
- Quick access to create new entry via floating button

### 📝 Create Page (Tạo ghi chú)
- Write long-form diary entries in Vietnamese
- Automatic date and time capture (user can edit)
- Add location information
- Upload multiple photos from phone library
- Preview images before saving
- Remove unwanted images
- Save entries to local storage

### 👁️ Detail View (Xem chi tiết)
- Display full entry content with preserved formatting
- Show metadata (date, time, location)
- Display all photos in full size
- Delete entries if needed
- Navigate back to home page

## Technical Details

- **Storage**: All data stored in browser localStorage
- **Offline-First**: Works completely offline
- **Responsive**: Optimized for mobile and tablet
- **Language**: Full Vietnamese UI
- **Authentication**: Integrated with Pi Network SDK
- **Images**: Stored as base64 data URLs

## App Structure

```
/app
├── page.tsx                    # Home page (list of entries)
├── create/page.tsx            # Create new entry page
├── entries/[id]/page.tsx      # View single entry
└── layout.tsx                 # Root layout

/lib
├── diary-storage.ts           # LocalStorage management
└── [other shared utilities]

/components
└── [shadcn/ui components]
```

## Usage

### Creating an Entry
1. Click the "+" button or "Viết ghi chú đầu tiên" link
2. Enter your diary content
3. Date and time auto-fill (editable)
4. Optionally add location
5. Select multiple photos
6. Click "Lưu ghi chú"

### Viewing Entries
1. Entries appear on home page sorted by date
2. Click any entry to view full content
3. All photos display in full size
4. Use back button to return to home

### Deleting Entries
1. Open any entry detail view
2. Click trash icon in header
3. Confirm deletion

## Design

- **Warm, minimalist aesthetic** with rose and amber gradients
- **Mobile-optimized** with touch-friendly buttons
- **Clear typography** for easy reading
- **Simple navigation** with intuitive flow
- **Large image display** for beautiful photo viewing

## Data Persistence

All entries are automatically saved to browser localStorage. To backup/restore:
- Export: Download JSON from console: `copy(JSON.stringify(JSON.parse(localStorage.getItem('diary_entries'))))`
- Import: Paste into console: `localStorage.setItem('diary_entries', '<JSON>')`

## Notes

- The app uses the Pi Network SDK for authentication
- All data is stored client-side only
- Images are converted to base64 and stored locally
- No server or cloud storage required
- App is fully functional offline

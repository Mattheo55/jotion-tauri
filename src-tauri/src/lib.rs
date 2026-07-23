use tauri_plugin_sql::{Migration, MigrationKind};

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let migrations = vec![
        Migration {
            version: 1,
            description: "Create notebook table",
            sql: include_str!("../../drizzle/20260719140142_purple_mockingbird/migration.sql"),
            kind: MigrationKind::Up,
        },
        Migration {
            version: 2,
            description: "Create note table",
            sql: include_str!("../../drizzle/20260719163332_overconfident_vector/migration.sql"),
            kind: MigrationKind::Up,
        },
        Migration {
            version: 3,
            description: "Add note reference notebook table",
            sql: include_str!("../../drizzle/20260719163525_bright_leopardon/migration.sql"),
            kind: MigrationKind::Up,
        },
        Migration {
            version: 4,
            description: "Add timestamp to note table",
            sql: include_str!("../../drizzle/20260719170104_damp_lethal_legion/migration.sql"),
            kind: MigrationKind::Up,
        },
        Migration {
            version: 5,
            description: "Add timestamp to note table",
            sql: include_str!("../../drizzle/20260722100733_amused_loners/migration.sql"),
            kind: MigrationKind::Up,
        },
    ];

    tauri::Builder::default()
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(
            tauri_plugin_sql::Builder::new()
                .add_migrations("sqlite:db.db", migrations)
                .build(),
        )
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

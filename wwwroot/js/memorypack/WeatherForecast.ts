import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";

export class WeatherForecast {
    date: Date;
    temperatureC: number;
    temperatureF: number;
    summary: string | null;

    constructor() {
        this.date = new Date(0);
        this.temperatureC = 0;
        this.temperatureF = 0;
        this.summary = null;

    }

    static serialize(value: WeatherForecast | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: WeatherForecast | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(4);
        writer.writeDate(value.date);
        writer.writeInt32(value.temperatureC);
        writer.writeInt32(value.temperatureF);
        writer.writeString(value.summary);

    }

    static serializeArray(value: (WeatherForecast | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (WeatherForecast | null)[] | null): void {
        writer.writeArray(value, (writer, x) => WeatherForecast.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): WeatherForecast | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): WeatherForecast | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new WeatherForecast();
        if (count == 4) {
            value.date = reader.readDate();
            value.temperatureC = reader.readInt32();
            value.temperatureF = reader.readInt32();
            value.summary = reader.readString();

        }
        else if (count > 4) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.date = reader.readDate(); if (count == 1) return value;
            value.temperatureC = reader.readInt32(); if (count == 2) return value;
            value.temperatureF = reader.readInt32(); if (count == 3) return value;
            value.summary = reader.readString(); if (count == 4) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (WeatherForecast | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (WeatherForecast | null)[] | null {
        return reader.readArray(reader => WeatherForecast.deserializeCore(reader));
    }
}
